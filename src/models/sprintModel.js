//-------------------Sprint schema----------------------------------//
const mongoose = require('mongoose');
const { Schema } = mongoose;

// created schema for Sprint
const sprintSchema = new Schema({
  title: {type: String, required: true},
  start_at: Date,
  end_at: Date,
  _user: [{ type: mongoose.Schema.Types.ObjectId, ref:'User'}],
  maxColumns: {type: Number, required: true},
  // TODO columns, planningDaily
});

const Sprint = mongoose.model('Sprint', sprintSchema);

module.exports = Sprint;