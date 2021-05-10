const rewardRoute = require("express").Router();
const Reward = require("../../utilities/connections").Reward;

rewardRoute
  .route("/")
  .get(async (req, res, next) => {
    try {
      const rewards = await Reward.findAll();
      res.send(rewards);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newReward = await Reward.create(req.body);
      res.send(newReward);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
rewardRoute
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const reward = await Reward.findByPk(req.params.id);
      res.send(reward);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const editReward = await Reward.update(req.body, {
        returning: true,
        where: {
          _id: req.params.id,
        },
      });
      res.send(editReward);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const deleteReward = await Reward.destroy({
        where: { _id: req.params.id },
      }).then((rowDeleted) => {
        if (rowDeleted > 0) res.send("Reward Deleted");
        else res.send("No reward match");
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

module.exports = rewardRoute;
