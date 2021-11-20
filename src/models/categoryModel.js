module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      category_name: {
        type: Sequelize.STRING,
		unique: true,
        allowNull: false
      }
    },
      {
        freezeTableName: true,
        timestamps: false
    });
    return Category;
};