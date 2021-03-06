const db = require("../models");
const Product = db.product;
const Store = db.store;
const { Op } = require("sequelize");
const sequelize = db.sequelize;

const createProduct = (req, res) => {
    const product = {
        store_id: req.body.store_id,
        category_id: req.body.category_id,
        product_name: req.body.product_name,
        retail_price: req.body.retail_price,
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
    } else {
        Product.findAll({
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

const searchProduct = async (req, res) => {
    try {
        var query = `select distinct p.*, s.*
        from product p, store s
        where p.store_id = s.store_id AND LOWER(p.product_name) LIKE LOWER('%${req.query.product_name}%');`
        var [result, metadata] = await sequelize.query(query)
        res.send({
            status: "Success", 
            data: result
        })
    } catch (e) {
        res.status(500).send({
            message:
            err.message || "Error occurred while creating product"
        });
    }
}

const updateProduct = (req, res) => {
    const product = {
        store_id: req.body.store_id,
        category_id: req.body.category_id,
        product_name: req.body.product_name,
        retail_price: req.body.retail_price,
        product_price: req.body.product_price,
        stock: req.body.stock,
    }

    Product.update(product, {
        where: {
            product_id: req.query.product_id
        }
    }).then(data => {
            res.send({
                status: "Success",
                message: "Update product successful"
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Error occurred while updating product"
            });
    });
}

const deleteProduct = (req, res) => {
    Product.destroy({
        where: {
            product_id: req.query.product_id
        }
    }).then(data => {
            res.send({
                status: "Success",
                message: "Delete product successful"
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Error occurred while deleting product"
            });
    });
}

module.exports = {
    createProduct,
    getAllProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    searchProduct
}