const mainRoute = require("express").Router();

//SERVICES IMPORTS
const soldierRoute = require("./soldiers");
const weaponRoute = require("./weapons");
const missionRoute = require("./missions");
const rewardRoute = require("./rewards");

//SERVICES ENDPOINTS
mainRoute.use("/soldiers", soldierRoute);
mainRoute.use("/weapons", weaponRoute);
mainRoute.use("/missions", missionRoute);
mainRoute.use("/rewards", rewardRoute);

//EXPORT
module.exports = mainRoute;
