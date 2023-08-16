const express = require("express");
const cors = require("cors");
const connection = require("./db/connection");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const routerApi = require("./api");
app.use("/api", routerApi);

app.use((_, res) => {
  res.status(404).json({ status: "error", code: 404, data: "Not found" });
});

app.use((err, _, res) => {
  console.log(err.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal server error",
  });
});

connection
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error .message ${err.message}`);
  });