require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const allowedOrigins = process.env.CORS_WHITELIST.split(' ');
const corsOptions = {
	function (origin, callback) {
		console.log(origin)
		if (allowedOrigins.indexOf(origin) !== -1) {
		  callback(null, true)
		} else {
		  callback(new Error('Not allowed by CORS'))
		}
	}
}
app.use(cors(corsOptions));

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const router = require('./src/routes/indexRoutes');
app.use('/api', router);

const db = require("./src/models");
db.sequelize.sync()

app.use('/api/static', express.static(path.join(__dirname, 'uploads')))

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`App running on port ${port}`)
})