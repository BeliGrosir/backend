const db = require("../models");
const Cart = db.cart_item;
const sequelize = db.sequelize

const removeCartItem = async (req, res, next) => {
    try {
        for (let i = 0; i < req.productIds.length; i++) {
            var query = `SELECT c.cart_item_id, c.quantity FROM cart_item c WHERE product_id = ${req.productIds[i]} AND user_id = ${req.user.id}`
    
            var [result, metadata] = await sequelize.query(query)
            var queryDecrement = `UPDATE cart_item SET quantity=quantity-1 WHERE cart_item_id=${result[0].cart_item_id}`
            var queryDelete = `DELETE FROM cart_item WHERE cart_item_id=${result[0].cart_item_id}`
            if (result[0].quantity > 1) {
                var [result, metadata] = await sequelize.query(queryDecrement)
            } else {
                var [result, metadata] = await sequelize.query(queryDelete)
            }
            res.send({
                status: "Success",
                message: "Order created. Waiting for payment"
            })
        }
    } catch (e) {
        res.send({
            status: "Failed",
            message: e.message || "Failed to remove from cart item"
          });
        return;
    }
}

module.exports = {
    removeCartItem
}