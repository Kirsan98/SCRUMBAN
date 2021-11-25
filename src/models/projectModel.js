//-------------------Project schema----------------------------------//
const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const projectSchema = new Schema({
  title: {type: String, required: true},
  password: {type: String},
  created_at: { type: Date},
  updated_at: { type: Date},
  _members: [{ type: mongoose.Schema.Types.ObjectId, ref:'User'}],
  tasks: [{type: mongoose.Schema.Types.ObjectId, ref:'Task'}],
  sprints: [{type: Schema.Types.ObjectId, ref:'Sprint'}],
});

projectSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

projectSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};


const Project = mongoose.model('Project', projectSchema);
module.exports = Project;