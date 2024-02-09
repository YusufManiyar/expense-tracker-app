const Expense = require('../model/expense.js')

module.exports = {
    fetch : async (req, res) => {
        try {
            const expenses = await Expense.findAll();
            res.status(200).json(expenses);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    add :async (req, res) => {
        try {
            const { userId, description, amount } = req.body;
            const newExpense = await Expense.create({userId, description, amount });
            console.log(newExpense)
            res.status(201).json(newExpense);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    update : async (req, res) => {
        try {
          const expenseId = req.params.expenseId;
          const { description, amount } = req.body;
          const updatedExpense = await Expense.update({ description, amount }, { where: { id: expenseId } });
          res.status(200).json(updatedExpense);
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
    },

    delete :  async (req, res) => {
        try {
          const {id, userid} = req.body;
          await Expense.destroy({ where: { id: id,  userId: userid } });
          res.status(204).end();
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
    },
}