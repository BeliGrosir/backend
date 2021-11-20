const product = require('../controllers/productController.js');
const upload = require('../middlewares/uploadImage.js');
var router = require("express").Router();

router.post("/product", upload.uploadImage, product.createProduct)
router.get("/products", product.getAllProduct)
router.get("/product", product.getProduct)

module.exports = router