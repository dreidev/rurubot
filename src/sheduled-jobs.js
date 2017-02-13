'use strict';
const schedule = require('node-schedule');
const API = require('./api');
const Conversations = require('./conversations');
// sheduler rules
const shedulerRules = require('./scheduler-rules');

module.exports = function (){
  /*
   * scheduleMornigWorkCheckupQuestion sends a direct message to each member
   * asking them what they are working on today
   */
  let scheduleMornigWorkCheckupQuestion = schedule.scheduleJob(shedulerRules.workingDaysMoriningRule, function() {
      API.getMembersList().then(function(response) {
          const members = response.data.members;
          members.forEach(function(member) {
              Conversations.workingDaysMoriningPrivConvo(member);
          });
      }).catch(function(error) {
          console.log(error);
      });
  });
};
