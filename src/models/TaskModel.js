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
  // owner: {
  //   type: Number
  // },
  _users: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref:'User'
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date
  },
  estimated_duration: {
    type: String,
  },
  // columns_log: //TODO
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;