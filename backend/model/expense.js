// expenseModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../utils/data-config.js');
const User = require('./user.js')

const Expense = sequelize.define('Expense', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

Expense.belongsTo(User, { foreignKey: 'userId' });

module.exports = Expense;
