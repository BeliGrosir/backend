require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const router = require('./src/routes/indexRoutes');
app.use('/api', router);

const db = require("./src/models");
// db.sequelize.sync()

const port = 8000 || process.env.PORT;
app.listen(port, () => {
    console.log(`App running on port ${port}`)
})