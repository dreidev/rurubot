const mongoose = require('mongoose');
mongoose.Promise = Promise;

let togglTokenSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  token: {
    type: String,
  },
});

const TogglToken = mongoose.model('TogglToken', togglTokenSchema);

module.exports = TogglToken;
