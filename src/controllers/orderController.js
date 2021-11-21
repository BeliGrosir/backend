const db = require("../models");
const Order = db.orders;
const sequelize = db.sequelize

const createOrder = async (req, res, next) => {
    const order = {
        user_id: req.user.id,
        subtotal: req.body.subtotal,
        shipping_fee: req.body.shipping_fee,
        total: req.body.total,
        payment_proof: req.file.filename,
        status_id: 1
    }
    var order_items = JSON.parse(req.body.order_items)
    var query = `INSERT INTO orders (user_id,subtotal,shipping_fee,total,payment_proof,status_id) 
    VALUES (${order.user_id},${order.subtotal},${order.shipping_fee},${order.total},
        '${order.payment_proof}',${order.status_id}) RETURNING order_id`
    console.log(order_items)
    
    try {   
        var [result, metadata] = await sequelize.query(query)
        for (let i = 0; i < order_items.length; i++) {
            var queryItems = `INSERT INTO "order_item" ("order_item_id","order_id","quantity","product_id") 
            VALUES (DEFAULT,${result[0].order_id},${order_items[i].quantity},${order_items[i].product_id})`
            var [result, metadata] = await sequelize.query(queryItems)
        }
        var productIds = [...new Set(order_items.map(data => data.product_id))];
        var quantities = [...new Set(order_items.map(data => data.quantity))];
        req.productIds = productIds
        req.quantities = quantities
        next()
    } catch (e) {
            res.status(500).send({
                message:
                e.message || "Error occurred while creating order"
            });
    }
}

const addPaymentProof = (req, res) => {
    console.log(req.file.filename)
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