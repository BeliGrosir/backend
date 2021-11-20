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

db.product.belongsTo(db.store, {foreignKey: 'store_id'})
db.product.belongsTo(db.category, {foreignKey: 'category_id'})
db.cart_item.hasMany(db.users, {foreignKey: 'user_id'})
db.cart_item.hasMany(db.product, {foreignKey: 'product_id'})

module.exports = db;