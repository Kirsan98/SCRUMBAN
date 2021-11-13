// requite to valid an email adress
const { isEmail } = require('validator');
const mongoose = require('mongoose');
// requite to hash a password
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        required: true,
        validate: [isEmail, 'invalid email'],
        createIndexes: { unique: true },
    },
    username: {
      type: String,
      required: true,
    },
    password: { 
        type: String, 
        required: true 
    }
});

userSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;