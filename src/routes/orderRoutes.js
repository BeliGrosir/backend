const order = require('../controllers/orderController.js');
const auth = require('../middlewares/verifyToken.js');
const rm = require('../middlewares/removeFromCart.js');
const upload = require('../middlewares/uploadImage.js');
var router = require("express").Router();

router.get("/order", auth.verifyToken, order.getOrders)
router.post("/order", auth.verifyToken, upload.uploadImage, order.createOrder, rm.removeCartItem)
router.put("/order/payment", auth.verifyToken, upload.uploadImage, order.addPaymentProof)

module.exports = router