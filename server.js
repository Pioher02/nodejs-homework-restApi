const express = require("express");
const cors = require("cors");
const connection = require("./db/connection");
const routerApi = require ("./api");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

require("./config/config-passport");

app.use("/api", routerApi);

app.use((_, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: `Use api on routes: 
    /api/registration - registration user {username, email, password}
    /api/login - login {email, password}
    /api/list - get message if user is authenticated`,
    data: "Not found",
  });
});

app.use((err, _, res) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connection successful on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server not running.
        Error message: ${err.message}`);
  });
