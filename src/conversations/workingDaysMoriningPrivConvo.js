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
  DailyTasks.create({
    user_id: userID,
    tasks: list,
  }, (res, err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
    mongoose.disconnect();
  });
}

module.exports = function(member) {
  let memberCurrentDayTasks = [];
  if (member.name === 'tokyo') {
    bot.startPrivateConversation({
      user: member.id,
    }, (err, convo) => {
      if (!err) {
        // convo.say('Hello, ' + member.name);
        convo.ask('Hello ' + member.name + ',\nWhat are your working on today?', [
          {
            pattern: 'nothing',
            callback: (response, convo) => {
              memberCurrentDayTasks.push({description: response.text});
              writeData(member.id, memberCurrentDayTasks);
              convo.changeTopic('never_mind');
            },
          }, {
            default: true,
            callback: (response, convo) => {
              memberCurrentDayTasks.push({description: response.text});
              convo.changeTopic('anything_else_1');
            },
          },
        ], {});

        convo.addQuestion({
          text: 'Cool, what is it?',
        }, [
          {
            pattern: 'nothing',
            callback: (response, convo) => {
              // stop the conversation. this will cause it to end with status == 'stopped'
              writeData(member.id, memberCurrentDayTasks);
              convo.changeTopic('never_mind');
            },
          }, {
            default: true,
            callback: (response, convo) => {
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
            callback: (response, convo) => {
              convo.changeTopic('anything_else_2');
            },
          }, {
            pattern: 'no',
            callback: (response, convo) => {
              // stop the conversation. this will cause it to end with status == 'stopped'
              writeData(member.id, memberCurrentDayTasks);
              convo.changeTopic('good_luck');
            },
          }, {
            default: true,
            callback: (response, convo) => {
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
