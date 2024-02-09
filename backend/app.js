const express = require('express');
const app = express();
const cors = require('cors')
const sequelize = require('./utils/data-config.js')

const port = process.env.PORT || 4000;
const expenseTrackerRouter = require('./routes/expenseTracker.js')
const logInRouter = require('./routes/logIn.js')
const signUpRouter = require('./routes/signUp.js')
app.use(express.json())
app.use(cors())

app.use('/', logInRouter)
app.use('/', signUpRouter)
app.use('/', expenseTrackerRouter)

sequelize
.sync()
.then((result) => {
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`)
    })
}).catch((err) => {
    console.log(err)
})