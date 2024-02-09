const User = require('../model/user.js');

module.exports = {
    signup : async (req, res) => {
        try {
          const { username, email, password } = req.body;
          const newUser = await User.create({ username, email, password });
          res.status(201).json(newUser);
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      },

    login : async (req, res) => {
        try {
          const { email, password } = req.body;
          const user = await User.findOne({ where: { email, password } });
          if (user) {
            // Successful login
            res.status(200).json(user);
          } else {
            // Invalid credentials
            res.status(401).json({ message: 'Invalid username or password' });
          }
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
    },
}
