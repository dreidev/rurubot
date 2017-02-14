// const moment = require('moment');
const mongoose = require('mongoose');
const config = require('../config/config');
const DailyTasks = require('./models/daily-tasks');


module.exports = function() {
  mongoose.connect(config.MONGO_URI);

  let dailyTasks = new DailyTasks({
    slack_id: '1234567',
    tasks: [
      {
        description: 'dummyTask1',
      }, {
        description: 'dummyTask2',
      },
    ],
  });
  dailyTasks.save(function(err, result) {
    if (err) {
      console.log('-----------');
      console.log(err);
      console.log('-----------');
    } else {
      console.log('----------------------');
      console.log(result);
      console.log('----------------------');
    }
  });
};
