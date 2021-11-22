//-------------------Sprint schema----------------------------------//
const mongoose = require('mongoose');
const { Schema } = mongoose;

// created schema for Sprint
const sprintSchema = new Schema({
  title: {type: String, required: true},
  // start_at: {type: Date},
  // end_at: {type: Date},
  // _user: [{ type: mongoose.Schema.Types.ObjectId, ref:'User'}],
  // maxColumns: {type: Number},
  // TODO columns, planningDaily
});

const Sprint = mongoose.model('Sprint', sprintSchema);

module.exports = Sprint;