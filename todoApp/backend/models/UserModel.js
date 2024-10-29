const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('todoApp', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
});

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          set(value) {
            // Hash the password before saving it
            const hashedPassword = hashPassword(value);
            this.setDataValue('password', hashedPassword);
          },
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: false,
      }
    );
  }
}

function hashPassword(password) {
  // Implement a hashing function, e.g., using bcrypt
  // return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  return password; // Placeholder, replace with actual hashing logic
}

module.exports = User;
