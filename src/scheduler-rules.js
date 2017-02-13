const schedule = require('node-schedule');

// Dreidev working days 10 am rule
const workingDaysMoriningRule = new schedule.RecurrenceRule();
workingDaysMoriningRule.dayOfWeek = [new schedule.Range(0, 4)];
workingDaysMoriningRule.hour = 16;
workingDaysMoriningRule.minute = 50;

module.exports.workingDaysMoriningRule = workingDaysMoriningRule;
