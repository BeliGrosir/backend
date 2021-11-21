const store = require('../controllers/storeController.js');
const upload = require('../middlewares/uploadImage.js');
var router = require("express").Router();

router.post("/store", upload.uploadImage, store.createStore)
router.delete("/store", store.deleteStore)

module.exports = router