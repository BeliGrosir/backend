module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: Sequelize.STRING,
		    unique: true,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
		    unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone_no: {
        type: Sequelize.STRING,
        allowNull: false
      },
    },
      {
        freezeTableName: true,
        timestamps: false
    });
    return User;
};