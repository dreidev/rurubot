const mongoose = require('mongoose');
mongoose.Promise = Promise;

let projectSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'noname',
  },
  category: {
    type: String,
    default: 'web',
  },
  date_added: {
    type: Date,
    default: Date.now,
  },
  state: {
    type: String,
    enum: ['icebox', 'pending', 'in_progress', 'complete', 'maintenance'],
    default: 'icebox',
  },
  client: {
    type: String,
  },
});

projectSchema.index({name: 1, category: 1}, {unique: true});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
