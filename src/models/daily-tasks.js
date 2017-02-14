const mongoose = require('mongoose');
mongoose.Promise = Promise;

let dailyTasksSchema = new mongoose.Schema({
  slack_id: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tasks: [
    {
      description: String,
    },
  ],
});

dailyTasksSchema.index({slack_id: 1, date: 1}, {unique: true});

const DailyTasks = mongoose.model('DailyTasks', dailyTasksSchema);

module.exports = DailyTasks;
