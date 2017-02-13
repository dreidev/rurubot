const mongoose = require('mongoose');

let dailyTasksSchema = new mongoose.Schema({
  slack_id: {
    type: String,
    unique: true,
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

const DailyTasks = mongoose.model('DailyTasks', dailyTasksSchema);

module.exports = DailyTasks;
