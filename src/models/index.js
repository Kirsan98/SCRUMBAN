const dbConfig = require("../config/db.config.js");
// require to hash password
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.user = require("./userModel.js");

module.exports = db;