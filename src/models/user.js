const mongoose = require('mongoose');
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
  deleted: Boolean,
  real_name: String,
  user_level: {
    type: String,
    enum: ['normal', 'admin'],
  },
  // This follows profile in slack schema.
  profile: {
    first_name: String,
    last_name: String,
    email: String,
    is_admin: Boolean,
    is_owner: Boolean,
    is_primary_owner: Boolean,
    is_restricted: Boolean,
    is_ultra_restricted: Boolean,
    is_bot: Boolean,
    has_2fa: Boolean,
  },
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
