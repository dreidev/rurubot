'use strict';
const mongoose = require('mongoose');
const config = require('../../config/config');
const DailyTasks = require('../models/daily-tasks.js');
const rurubot = require('../bots/rurubot');
// get rurobot bot instance
const bot = rurubot.bot;

// writes data
function writeData(userID, list) {
  console.log('writing data');
  mongoose.connect(config.MONGO_URI);
  let dailyTasks = new DailyTasks({
    user_id: userID,
    tasks: list,
  });
  dailyTasks.save(function(err, result) {
    if (err) {
      console.log(err);
      bot.reply(message, `uhm, Sorry but I couldn't update your daily working tasks.`);
    } else {
      console.log(result);
    }
  });
  mongoose.disconnect();
}

module.exports = function(member) {
  let memberCurrentDayTasks = [];
  if (member.name === 'tokyo') {
    bot.startPrivateConversation({
      user: member.id,
    }, function(err, convo) {
      if (!err) {
        // convo.say('Hello, ' + member.name);
        convo.ask('Hello ' + member.name +',\nWhat are your working on today?', [
          {
            pattern: 'nothing',
            callback: function(response, convo) {
              memberCurrentDayTasks.push({description: response.text});
              writeData(member.id, memberCurrentDayTasks);
              convo.changeTopic('never_mind');
            },
          }, {
            default: true,
            callback: function(response, convo) {
              memberCurrentDayTasks.push({description: response.text});
              convo.changeTopic('anything_else_1');
            },
          },
        ], {});

        convo.addQuestion({
          text: 'What are your working on today?',
        }, function() {}, 'what_are_you_working_on');

        convo.addQuestion({
          text: 'Cool, what is it that?',
        }, [
          {
            pattern: 'nothing',
            callback: function(response, convo) {
              // stop the conversation. this will cause it to end with status == 'stopped'
              writeData(member.id, memberCurrentDayTasks);
              convo.changeTopic('never_mind');
            },
          }, {
            default: true,
            callback: function(response, convo) {
              memberCurrentDayTasks.push({description: response.text});
              // console.log(response);
              convo.changeTopic('anything_else_1');
            },
          },
        ], {}, 'anything_else_2');

        convo.addQuestion({
          text: 'Awesome, Are you working on anything else?',
        }, [
          {
            pattern: 'yes',
            callback: function(response, convo) {
              convo.changeTopic('anything_else_2');
            },
          }, {
            pattern: 'no',
            callback: function(response, convo) {
              // stop the conversation. this will cause it to end with status == 'stopped'
              writeData(member.id, memberCurrentDayTasks);
              convo.changeTopic('good_luck');
            },
          }, {
            default: true,
            callback: function(response, convo) {
              // console.log(response);
              memberCurrentDayTasks.push({description: response.text});
              convo.changeTopic('anything_else_1');
            },
          },
        ], {}, 'anything_else_1');

        convo.addMessage({
          text: 'Okay, Never mind.',
        }, 'never_mind');

        convo.addMessage({
          text: 'Okay, Good luck.',
        }, 'good_luck');

        convo.activate();
      }
    });
  }
};
