const missionRoute = require("express").Router();
const Mission = require("../../utilities/connections").Mission;

missionRoute
  .route("/")
  .get(async (req, res, next) => {
    try {
      const missions = await Mission.findAll();
      res.send(missions);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newMission = await Mission.create(req.body);
      res.send(newMission);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
missionRoute
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const mission = await Mission.findByPk(req.params.id);
      res.send(mission);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const editMission = await Mission.update(req.body, {
        returning: true,
        where: {
          _id: req.params.id,
        },
      });
      res.send(editMission);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const deleteMission = await Mission.destroy({
        where: { _id: req.params.id },
      }).then((rowDeleted) => {
        if (rowDeleted > 0) res.send("Mission Deleted");
        else res.send("No mission match");
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

module.exports = missionRoute;
