const db = require("../models");
var bcrypt = require('bcryptjs'); 
const User = db.users;
const jwt = require('jsonwebtoken');

const registerUser = (req, res) => {
    const user = {
        username: req.body.username.trim(),
        password: bcrypt.hashSync(req.body.password, 10),
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone_no: req.body.phone_no
    }

    User.create(user)
        .then(data => {
            console.log(data.password)
            console.log(req.body.password)
            res.send({
				status: "Success",
                message: "User created"
            });
        })
        .catch(err => {
            res.status(500).send({
				status: "Failed",
                message: err.message || "Error occurred while creating a user"
            });
    });
}

const logIn = async (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        },
      })
    .then(data => {
        const verified = bcrypt.compareSync(req.body.password, data.password)
        if (verified) {
            var tokenCreds = { id: data.user_id, username: data.username, name: data.name}
            const accessToken = jwt.sign(tokenCreds, process.env.JWT_SECRET, {
                                    expiresIn: '1d'
                                })
            res.send({
                status: "Success",
                user_id: data.user_id,
                username: data.username,
                name: data.name,
                token: accessToken
            })
        } else {
            res.status(500).send({
                status: "Fail",
                message: "User and password do not match"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            status: "Fail",
            message: err.message || "User and password do not match"
        });
    });
}

module.exports = {
    registerUser,
    logIn
}