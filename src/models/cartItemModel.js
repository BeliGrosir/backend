module.exports = (sequelize, Sequelize) => {
    const CartItem = sequelize.define("cart_item", {
      cart_item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    },
      {
        freezeTableName: true,
        timestamps: false
    });
    return CartItem;
};