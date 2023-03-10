const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  return users.init(sequelize, DataTypes);
};
/**
 * @openapi
 * components:
 *   schema:
 *     register:
 *       type: object
 *         properties:
 *           firstname:
 *             type: string
 *             example: Miguel
 *           lasstname:
 *             type: string
 *             example: aubaarsenal@gmail.com
 *            
 *           email:
 *             type: string
 *             example: ian.rosas@academlo.com
 *           phone:
 *             type: string
 *             example: 999999999
 *           password:
 *              type: string
 *              example: ian.rosas@academlo.com
 *            password:
 *              type: string
 *              example: 1234
 *        loginResponse:
 *          type: object
 *          properties:
 *             firstname:
 *                type: string,
 *                example: Ian
 *    securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWt
 *             
*/

class users extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          autoIncrement: true,
          autoIncrementIdentity: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        firstname: {
          type: DataTypes.STRING(15),
          allowNull: false,
        },
        lastname: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING(30),
          allowNull: false,
          unique: "users_email_key",
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING(15),
          allowNull: false,
          unique: "users_phone_key",
        },
        profile_image: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        hooks: {
          beforeCreate: (user, options) => {
            const { password } = user;
            const hash = bcrypt.hashSync(password, 10);
            user.password = hash;
          },
        },
        sequelize,
        tableName: "users",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "users_email_key",
            unique: true,
            fields: [{ name: "email" }],
          },
          {
            name: "users_phone_key",
            unique: true,
            fields: [{ name: "phone" }],
          },
          {
            name: "users_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
  }
}
