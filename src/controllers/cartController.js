const db = require("../models");
const Cart = db.cart_item;
const Product = db.product;

const addToCart = (req, res) => {
    const cart = {
        product_id: req.body.product_id,
        user_id: req.user.id,
        quantity: req.body.quantity
    }

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

const getCartItems = (req, res) => {
    Cart.findAll({
        where: {
            user_id: parseInt(req.user.id)
        },
        include: Product
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
    addToCart,
    getCartItems,
    removeCartItem,
    deleteCartItem,
    incrementQuantity,
    addToCart
}