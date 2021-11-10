const mongoose = require('mongoose');

const { Schema } = mongoose;

const TaskSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  color:{
    type: String,
    required: false
  },
  desrciption: {
    type: String
  },
  owner: {
    type: Number
  },
  creation_date: {
    type: Date
  },
  estimated_duration: {
    type: String,
  },
  // columns_log: //TODO

});

const Model = mongoose.model('Task', TaskSchema);
module.exports = Model;