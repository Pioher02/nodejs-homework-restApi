const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require("dotenv").config();
const DB_HOST = process.env.DB_HOST;

const connection = mongoose.connect(DB_HOST, {

    useNewUrlParser: true,
    useUnifiedTopology: true,

});

module.exports = connection;