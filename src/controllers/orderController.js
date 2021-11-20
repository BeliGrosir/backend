const db = require("../models");
const Product = db.product;
const Order = db.orders;
const Store = db.store;
const OrderItem = db.order_item;
const sequelize = db.sequelize

const createOrder = (req, res, next) => {
    const order = {
        user_id: req.user.id,
        subtotal: req.body.subtotal,
        shipping_fee: req.body.shipping_fee,
        total: req.body.total,
        status_id: 1
    }
    var order_items = req.body.order_items
    Order.create(order)
        .then(data => {
            req.data = data
            order_items.forEach(d => {
                OrderItem.create({
                    order_id: data.order_id,
                    product_id: d.product_id,
                    quantity: d.quantity,
                })
            })
            next()
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Error occurred while creating order"
            });
    });
}

const addPaymentProof = (req, res) => {
    Order.update({
        payment_proof: req.file.filename,
        status_id: 2
    },{ where: {
        order_id: req.body.order_id
    }}).then(data => {
        res.send({
            status: "Success",
            message: "Payment updated"
        })
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Error occurred while adding payment proof"
        });
    });
}

const getOrders = async (req, res) => {
    try {
        var query = `SELECT o.*, oi.*, p.*, s.*
        FROM orders o, order_item oi, product p, store s
        WHERE o.user_id = ${req.user.id} AND oi.order_id = o.order_id 
        AND oi.product_id = p.product_id AND p.store_id = s.store_id`
        var [result, metadata] = await sequelize.query(query)
		res.send({
			status: "Success",
			data: result,
		})
    } catch (e) {
        res.status(500).send({
			status: e.message || "Failed",
			data: [],
		});
    }
}

module.exports = {
    createOrder,
    getOrders,
    addPaymentProof
}