const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    dialect: "postgres",
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Connection Established"))
  .catch((e) =>
    console.log({
      error: e,
      credentials: {
        host: process.env.PG_HOST,
        database: process.env.PG_DATABASE,
        username: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
      },
    })
  );

module.exports = { sequelize };
