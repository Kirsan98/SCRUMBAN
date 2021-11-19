//-------------------Project schema----------------------------------//
const mongoose = require('mongoose');
const { Schema } = mongoose;

// created schema for Log
const logSchema = new Schema({
  _userId: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  _columnIdStart: {type: mongoose.Schema.Types.ObjectId, ref:'Column'},
  _columnIdEnd: {type: mongoose.Schema.Types.ObjectId, ref:'Column'},
  updated_at : {type: Date}
});

const Log = mongoose.model('Log', logSchema);
module.exports = Log;