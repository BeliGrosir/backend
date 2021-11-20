const dbConfig = require("../config/dbConfig");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect
  })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./userModel.js')(sequelize, Sequelize)
db.category= require('./categoryModel.js')(sequelize, Sequelize)
db.product = require('./productModel.js')(sequelize, Sequelize)
db.store = require('./storeModel.js')(sequelize, Sequelize)
db.cart_item = require('./cartItemModel.js')(sequelize, Sequelize)
db.order_status = require('./statusModel.js')(sequelize, Sequelize)
db.orders = require('./orderModel.js')(sequelize, Sequelize)
db.order_item = require('./orderItemModel.js')(sequelize, Sequelize)

db.product.belongsTo(db.store, {foreignKey: 'store_id'})
db.product.belongsTo(db.category, {foreignKey: 'category_id'})
db.users.hasMany(db.cart_item, {foreignKey: 'user_id'})
db.product.hasMany(db.cart_item, {foreignKey: 'product_id'})
db.order_item.belongsTo(db.orders, {foreignKey: 'order_id'})
db.product.hasMany(db.order_item, {foreignKey: 'product_id'})
db.order_status.hasMany(db.orders, {foreignKey: 'status_id'})

module.exports = db;