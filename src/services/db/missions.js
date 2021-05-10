const uuid = require("uuid").v4;
module.exports = (sequelize, DataTypes, Sequelize) => {
  const Mission = sequelize.define(
    "Mission",
    {
      _id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      target: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("Main", "Secondary"),
        allowNull: false,
      },
      iscomplete: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      hooks: {
        beforeCreate: function (mission) {
          mission._id = uuid();
        },
      },
    }
  );
  return Mission;
};
