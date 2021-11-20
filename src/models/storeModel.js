module.exports = (sequelize, Sequelize) => {
    const Store = sequelize.define("store", {
      store_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      store_name: {
        type: Sequelize.STRING,
		unique: true,
        allowNull: false
      },
      store_location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      store_image: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
      {
        freezeTableName: true,
        timestamps: false
    });
    return Store;
};