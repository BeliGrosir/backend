require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const router = require('./src/routes/indexRoutes');
app.use('/api', router);

const db = require("./src/models");
// db.sequelize.sync()

app.use('/api/static', express.static(path.join(__dirname, 'uploads')))

const port = 8000 || process.env.PORT;
app.listen(port, () => {
    console.log(`App running on port ${port}`)
})