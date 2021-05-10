const weaponRoute = require("express").Router();
const Weapon = require("../../utilities/connections").Weapon;

weaponRoute
  .route("/")
  .get(async (req, res, next) => {
    try {
      const weapons = await Weapon.findAll();
      res.send(weapons);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newWeapon = await Weapon.create(req.body);
      res.send(newWeapon);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });
weaponRoute
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const weapon = await Weapon.findByPk(req.params.id);
      res.send(weapon);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const editWeapon = await Weapon.update(req.body, {
        returning: true,
        where: {
          _id: req.params.id,
        },
      });
      res.send(editWeapon);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const deleteWeapon = await Weapon.destroy({
        where: { _id: req.params.id },
      }).then((rowDeleted) => {
        if (rowDeleted > 0) res.send("Weapon Deleted");
        else res.send("No weapon match");
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

module.exports = weaponRoute;
