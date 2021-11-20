const db = require("../models");
const Cart = db.cart_item;
const sequelize = db.sequelize

const addToCart = (req, res) => {
    const cart = {
        product_id: req.body.product_id,
        user_id: req.user.id,
        quantity: req.body.quantity
    }

    Cart.findOne({
        where: {
            user_id: req.user.id,
            product_id: req.body.product_id
        }
    }).then(data => {
        if (data != null) {
            Cart.increment('quantity', { by: req.body.quantity, 
                where: { 
                cart_item_id: data.cart_item_id 
            }})
            .then(data => {
                res.send({
                    status: "Success",
                    message: "Cart item has been added to cart"
                });
            })
            .catch(err => {
                res.status(500).send({
                    status: "Failed",
                    message: err.message || "Error occurred while adding product to cart"
                });
            })
        } else {
            Cart.create(cart)
            .then(data => {
                res.send({
                    status: "Success",
                    message: "Add product to cart successful"
                });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                    err.message || "Error occurred while adding product to cart"
                });
        });
        }
    }).catch(err => {
            res.status(500).send({
                message:
                err.message || "Error occurred while adding product to cart"
            });
    });
}

const incrementQuantity = (req, res) => {
    Cart.increment('quantity', { by: 1, 
        where: { 
        cart_item_id: req.query.cart_item_id 
    }})
    .then(data => {
        res.send({
            status: "Success",
            message: "Cart item has been added to cart"
        });
    })
    .catch(err => {
        res.status(500).send({
            status: "Failed",
            message: err.message || "Error occurred while adding product to cart"
        });
})
}

const deleteCartItem = (req, res) => {
	Cart.destroy({
		where: { 
            cart_item_id: req.query.cart_item_id 
        }})
	.then(data => {
		if (data == 1) {
		  res.send({
			status: "Success",
			message: "Product has been deleted from cart"
		  });
		} else {
		  res.send({
			status: "Failed",
			message: "Remove product from cart failed"
		  });
		}
	  })
	.catch(err => {
		res.status(500).send({
			message: "Error occurred while deleting cart item"
		});
	})
}

const removeCartItem = (req, res) => {
	Cart.findOne({
        where: {
            cart_item_id: req.query.cart_item_id
        }})
	.then(data => {
		if (data.quantity > 1){
			Cart.decrement('quantity', { by: 1, where: { 
                cart_item_id: req.query.cart_item_id
             }})
			.then(data => {
				res.send({
					status: "Success",
					message: "Cart item removed"
				  });
			})
			.catch(err => {
				res.status(500).send({
					status: "Success",
					message: "Failed to remove cart item"
				  });
			})
		}else{
			Cart.destroy({
				where: { 
                    cart_item_id: req.query.cart_item_id 
            }})
			.then(data => {
				if (data == 1) {
				  res.send({
					status: "Success",
					message: "Cart item has been removed"
				  });
				} else {
                    res.status(500).send({
                        status: "Success",
                        message: "Failed to remove cart item"
                    });
				}
			  })
			.catch(err => {
				res.status(500).send({
					status: "Success",
					message: "Failed to remove cart item"
				  });
			})
		}
	}).catch(err => {
		res.send({
			status: "Failed",
			message: err.message || "Cart item is not found"
		  });
	});
}

const getCartItems = async (req, res) => {
	query = `select c.cart_item_id, c.quantity, product.*
			from product, cart_item c
			where product.product_id = c.product_id
			and c.user_id = ${req.user.id}`;

	try {
		var [result, metadata] = await sequelize.query(query)
		res.json({
			status: "Success",
			data: result,
		})
	} catch (error) {
		res.status(500).json({
			status: error.message || "Failed",
			data: [],
		});
	}
}

module.exports = {
    addToCart,
    getCartItems,
    removeCartItem,
    deleteCartItem,
    incrementQuantity,
    addToCart
}