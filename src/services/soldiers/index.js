const soldierRoute = require("express").Router();
const Soldier = require("../../utilities/connections").Soldier;

soldierRoute
  .route("/")
  .get(async (req, res, next) => {
    try {
      const soldiers = await Soldier.findAll();
      res.send(soldiers);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newSoldier = await Soldier.create(req.body);
      res.send(newSoldier);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
soldierRoute
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const soldier = await Soldier.findByPk(req.params.id);
      res.send(soldier);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const editSoldier = await Soldier.update(req.body, {
        returning: true,
        where: {
          _id: req.params.id,
        },
      });
      res.send(editSoldier);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const deleteSoldier = await Soldier.destroy({
        where: { _id: req.params.id },
      }).then((rowDeleted) => {
        if (rowDeleted > 0) res.send("Soldier Deleted");
        else res.send("No soldier match");
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

module.exports = soldierRoute;
