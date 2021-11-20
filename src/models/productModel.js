module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      store_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      product_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      retail_price: {
        type: Sequelize.INTEGER,
      },
      product_price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      product_image: {
        type: Sequelize.TEXT,
      },
      stock: {
        type: Sequelize.INTEGER,
      },
    },
      {
        freezeTableName: true,
        timestamps: false
    });
    return Product;
};