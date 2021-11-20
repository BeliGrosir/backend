const db = require("../models");
const Cart = db.cart_item;

const removeCartItem = (req, res, next) => {
    var order_items = req.body.order_items
    var count = 0;
    for (let i = 0; i < order_items.length; i++) {
        Cart.findOne({
            where: {
               product_id: order_items[i].product_id,
               user_id: req.user.id
            }})
        .then(data => {
            if (data.quantity > 1){
                Cart.decrement('quantity', { by: order_items[i].quantity, where: { 
                    cart_item_id: data.cart_item_id
                 }})
                .then(data => {
                    count++
                })
                .catch(err => {
                    console.log(err.message)
                    res.status(500).send({
                        status: "Success",
                        message: "Failed to remove cart item"
                      });
                      return;
                })
            }else{
                Cart.destroy({
                    where: { 
                        cart_item_id: data.cart_item_id 
                }})
                .then(data => {
                    if (data == 1) {
                        count++
                    }
                  })
                .catch(err => {
                    console.log(err.message)
                    res.status(500).send({
                        status: "Success",
                        message: "Failed to remove cart item"
                      });
                      return;
                })
            }
            res.send({
                status: "Success",
                message: "Order created. Waiting for payment"
            })
        }).catch(err => {
            res.send({
                status: "Failed",
                message: err.message || "Cart item is not found"
              });
            return;
        });
    }
}

module.exports = {
    removeCartItem
}