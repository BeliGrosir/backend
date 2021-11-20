module.exports = (sequelize, Sequelize) => {
    const OrderItem = sequelize.define("order_item", {
      order_item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    },
      {
        freezeTableName: true,
        timestamps: false
    });
    return OrderItem;
};