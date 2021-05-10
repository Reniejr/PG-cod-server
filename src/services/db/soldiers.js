const uuid = require("uuid").v4;

module.exports = (sequelize, DataTypes, Sequelize) => {
  const Soldier = sequelize.define(
    "Soldier",
    {
      _id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      faction: {
        type: DataTypes.ENUM("Ghost", "Terror"),
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
      },
      speciality: {
        type: DataTypes.JSON,
      },
      inteam: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCreate: function (soldier) {
          soldier._id = uuid();
        },
      },
    }
  );

  // Soldier.associate = (models) => {
  //   Soldier.hasMany(models.Weapon);
  // };
  return Soldier;
};
