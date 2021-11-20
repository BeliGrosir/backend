module.exports = (sequelize, Sequelize) => {
    const Status = sequelize.define("order_status", {
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      status_name: {
        type: Sequelize.STRING,
		    unique: true,
        allowNull: false
      }
    },
      {
        freezeTableName: true,
        timestamps: false
    });
    return Status;
};