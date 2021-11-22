//-------------------Project schema----------------------------------//
const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
  title: {type: String, required: true},
  created_at: { type: Date},
  //updated_at: Date,
  // _members: [{ type: mongoose.Schema.Types.ObjectId, ref:'User'}],
  //tasks: [{type: mongoose.Schema.Types.ObjectId, ref:'Task'}],
  sprints: [{type: Schema.Types.ObjectId, ref:'Sprint'}],
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;