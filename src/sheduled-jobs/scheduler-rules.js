'use strict';
const schedule = require('node-schedule');

// Dreidev working days 10 am rule
const workingDaysMoriningRule = new schedule.RecurrenceRule();
workingDaysMoriningRule.dayOfWeek = [new schedule.Range(0, 4)];
workingDaysMoriningRule.hour = 10;
workingDaysMoriningRule.minute = 30;

module.exports.workingDaysMoriningRule = workingDaysMoriningRule;
