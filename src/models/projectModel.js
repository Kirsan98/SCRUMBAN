//-------------------Project schema----------------------------------//
const mongoose = require('mongoose');
const { Schema } = mongoose;

// created schema for Board
const projectSchema = new Schema({
  title: {type: String, required: true},
  created_at: {Date, default: Date.now},
  updated_at: Date,
  _members: [{ type: mongoose.Schema.Types.ObjectId, ref:'User'}],
  _tasks: [{type: mongoose.Schema.Types.ObjectId, ref:'Task'}],
  _sprints: [{type: mongoose.Schema.Types.ObjectId, ref:'Sprint'}]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;