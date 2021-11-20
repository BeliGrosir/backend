const cart = require('../controllers/cartController.js');
const auth = require('../middlewares/verifyToken.js');
var router = require("express").Router();

router.get("/cart", auth.verifyToken, cart.getCartItems)
router.post("/cart", auth.verifyToken, cart.addToCart)
router.put("/cart/increment", auth.verifyToken, cart.incrementQuantity)
router.put("/cart/decrement", auth.verifyToken, cart.removeCartItem)
router.delete("/cart", auth.verifyToken, cart.deleteCartItem)

module.exports = router