//MAIN IMPORTS
const express = require("express"),
  listEndpoints = require("express-list-endpoints"),
  cors = require("cors");

const db = require("./utilities/connections");

//SERVICES ROUTES IMPORTS
const mainRoute = require("./services");

//ERRORS HANDLING IMPORTS
const {
  notFound,
  unAuthorized,
  forbidden,
  badRequest,
  genericError,
} = require("./utilities/errors");

//MAIN
const server = express(),
  PORT = process.env.PORT || 5001,
  accessOrigin =
    process.env.NODE_ENV === "production"
      ? [process.env.FE_URL_PROD, process.env.FE_URL_DEV]
      : [process.env.FE_URL_DEV],
  corsOptions = {
    origin: function (origin, callback) {
      if (accessOrigin.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(
          new Error(
            "CORS ISSUES: Invalid access origin - Check access origins list"
          )
        );
      }
    },
  };

//MIDDLEWARES
server.use(express.json());
server.use(cors());

//SERVICES ENDPOINTS
//GENERAL
server.get("/", async (req, res, next) => {
  try {
    res.send("<h1>Welcome to Server</h1>");
  } catch (err) {
    console.log(err);
    next(err);
  }
});
server.use("/", mainRoute);

//ERRORS HANDLING
server.use(notFound);
server.use(unAuthorized);
server.use(forbidden);
server.use(badRequest);
server.use(genericError);

//CONSOLE LOGS
console.log(listEndpoints(server));

//SERVER LISTEN

db.sequelize
  .sync({ force: false })
  .then((result) => {
    server.listen(PORT, () => {
      process.env.NODE_ENV === "production"
        ? console.log(`Server running ONLINE on : ${PORT}`)
        : console.log(`Server running LOCALLY on : http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
