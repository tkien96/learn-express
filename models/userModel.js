const validator = require('validator')

module.exports = {
  InitSequel: function (sequelize, type) {
    var User = sequelize.define(
      "users",
      {
        id: {
          type: type.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: type.STRING,
          allowNull: false,
        },
        phone: {
          type: type.STRING,
          validate: {
            custom(value) {
              if (!validator.isMobilePhone(value, "vi-VN")) {
                throw new Error("Invalid phone number format (Vietnam)")
              }
            },
          },
        },
        email: {
          type: type.STRING,
          allowNull: false,
          isEmail: true,
          unique: true,
        },
        password: {
          type: type.STRING,
          allowNull: false
        },
        created_at: {
          type: type.DATE,
          defaultValue: type.NOW,
          allowNull: false
        },
        updated_at: {
          type: type.DATE,
          allowNull: true
        },
        active: {
          type: type.ENUM,
          values: ['0', '1'],
          defaultValue: '1'
        }
      },
      {
        tableName: "table_users",
        timestamps: false,
      }
    )
    return User
  },
}
