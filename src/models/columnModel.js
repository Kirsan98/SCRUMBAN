//-------------------Project schema----------------------------------//
const mongoose = require('mongoose');
const { Schema } = mongoose;

// created schema for Board
const columnSchema = new Schema({
  title: {type: String, required: true},
  index: Number,
  maxTask : Number,
  _tasks: [{type: mongoose.Schema.Types.ObjectId, ref:'Task'}],
});

const Column = mongoose.model('Project', columnSchema);

module.exports = Column;