const uuid = require("uuid").v4;
module.exports = (sequelize, DataTypes, Sequelize) => {
  const Weapon = sequelize.define(
    "Weapon",
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
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("Primary", "Secondary", "Grenade"),
        allowNull: false,
      },
      stats: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      hooks: {
        beforeCreate: function (weapon) {
          weapon._id = uuid();
        },
      },
    }
  );
  Weapon.associate = (models) => {
    Weapon.hasMany(models.Soldier, { as: "Equipment" });
  };
  return Weapon;
};
