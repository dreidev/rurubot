const mongoose = require('mongoose');
mongoose.Promise = Promise;
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  slack_id: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    select: false,
  },
  name: String,
  real_name: String,
  deleted: {
    type: Boolean,
    default: false,
  },
  // This follows data in slack schema.
  profile: {
    email: String,
    first_name: String,
    last_name: String,
    real_name: String,
    title: String,
    phone: String,
  },
  is_admin: Boolean,
  is_owner: Boolean,
  is_primary_owner: Boolean,
  is_restricted: Boolean,
  is_ultra_restricted: Boolean,
  is_bot: Boolean,
  has_2fa: Boolean,
});

userSchema.pre('save', function(next) {
  let user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
