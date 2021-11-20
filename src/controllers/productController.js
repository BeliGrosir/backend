const db = require("../models");
const sequelize = db.sequelize;
const Product = db.product;
const Store = db.store;

const createProduct = (req, res) => {
    const product = {
        store_id: req.body.store_id,
        category_id: req.body.category_id,
        product_name: req.body.retail_price,
        retail_price: req.body.product_desc,
        product_price: req.body.product_price,
        product_image: req.file.filename,
        stock: req.body.stock,
    }

    Product.create(product)
        .then(data => {
            res.send({
                status: "Success",
                message: "Create product successful"
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Error occurred while creating product"
            });
    });
}

const getAllProduct = (req, res) => {
    if (req.query.category_id) {
        Product.findAll({
            where: {
                category_id: req.query.category_id
            }
        }).then(data => {
            res.send({
                status: "Success", 
                data: data
            })
        }).catch(err => {
            res.status(500).send({
                message:
                err.message || "Error occurred while creating product"
            });
        })
    } else {
        Product.findAll().then(data => {
            res.send({
                status: "Success", 
                data: data
            })
        }).catch(err => {
            res.status(500).send({
                message:
                err.message || "Error occurred while creating product"
            });
        })
    }
}

const getProduct = (req, res) => {
    Product.findOne({
        where: {
            product_id: req.query.product_id
        },
        include: Store
    }).then(data => {
        res.send({
            status: "Success", 
            data: data
        })
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Error occurred while creating product"
        });
    })
}

module.exports = {
    createProduct,
    getAllProduct,
    getProduct
}