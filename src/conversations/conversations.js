'use strict';
const rurubot = require('../bots/rurubot');
// get rurobot bot instance
const bot = rurubot.bot;

module.exports.workingDaysMoriningPrivConvo = function(member) {
  // let memberWorkTodayList = [];
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
              convo.changeTopic('never_mind');
            },
          }, {
            default: true,
            callback: function(response, convo) {
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
              convo.changeTopic('never_mind');
            },
          }, {
            default: true,
            callback: function(response, convo) {
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
              convo.changeTopic('good_luck');
            },
          }, {
            default: true,
            callback: function(response, convo) {
              // console.log(response);
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
