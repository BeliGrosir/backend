module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("orders", {
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      subtotal: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      shipping_fee: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      total: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      payment_proof: {
        type: Sequelize.STRING,
      },
      status_id: {
        type: Sequelize.INTEGER,
      },
    },
      {
        freezeTableName: true,
        timestamps: false
    });
    return Order;
};