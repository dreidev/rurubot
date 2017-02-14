'use strict';
const schedule = require('node-schedule');
const API = require('../api');
const Conversations = require('../conversations/conversations');
// sheduler rules
const shedulerRules = require('./scheduler-rules');

module.exports = function() {
  /*
   * scheduleMornigWorkCheckupQuestion sends a direct message to each member
   * asking them what they are working on today
   */
  schedule.scheduleJob(shedulerRules.workingDaysMoriningRule, () => {
      API.getMembersList().then((response) => {
          const members = response.data.members;
          members.forEach((member) => {
              Conversations.workingDaysMoriningPrivConvo(member);
          });
      }).catch((error) => {
          console.log(error);
      });
  });
};
