const dbConfig = require("../config/db.config.js");
// require to hash password
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.user = require("./userModel.js");
db.task = require("./taskModel.js");
db.project = require("./projetModel.js");
db.sprint = require("./sprintModel.js");

module.exports = db;