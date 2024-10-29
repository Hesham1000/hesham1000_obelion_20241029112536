const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('None', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
});

class Task extends Model {
  static init(sequelize) {
    super.init({
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      priority: {
        type: DataTypes.ENUM('Low', 'Medium', 'High'),
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'Task',
      tableName: 'tasks',
      timestamps: false,
    });
  }
}

Task.init(sequelize);

module.exports = Task;
