const mongoose = require('mongoose');
mongoose.Promise = Promise;

let dailyTasksSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  user_name: {
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

dailyTasksSchema.index({user_id: 1, date: 1}, {unique: true});

const DailyTasks = mongoose.model('DailyTasks', dailyTasksSchema);

module.exports = DailyTasks;
