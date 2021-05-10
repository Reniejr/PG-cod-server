module.exports = (sequelize, DataTypes) => {
  const Reward = sequelize.define("Reward", {
    _id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    reward: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    isreedemed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
  Reward.associate = (models) => {
    Reward.hasMany(models.Mission, { as: "Reward" });
  };
  return Reward;
};
