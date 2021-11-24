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
  description: {
    type: String
  },
  state: {
    type: String
  },
  _owner: 
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref:'User'
    }
  ,
  created_at: {
    type: Date
  },
  estimated_duration: {
    type: String,
  },
  _logs: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref:'Log'
    },
  ]
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;