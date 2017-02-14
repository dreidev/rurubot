'usestrict';

// const config = require('../../config/config');
// const jsonQuery = require('json-query');
const API = require('../api');
const Conversations = require('../conversations/conversations');

// dreidev basic data
const basicDataJSON = require('../../data/basic-data.json');

module.exports = function(controller) {
  controller.hears([
    'call me (.*)', 'my name is (.*)',
  ], 'direct_message,direct_mention,mention', (bot, message) => {
    let name = message.match[1];
    controller.storage.users.get(message.user, (err, user) => {
      if (!user) {
        user = {
          id: message.user,
        };
      }
      user.name = name;
      controller.storage.users.save(user, (err, id) => {
        bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
      });
    });
  });

  // pants function
  controller.hears([
    'what does nader miss (.*)', 'what do I miss (.*)',
  ], 'direct_message,direct_mention,mention', (bot, message) => {
    let name = message.match[1];
    controller.storage.users.get(message.user, (err, user) => {
      if (!user) {
        user = {
          id: message.user,
        };
      }
      user.name = name;
      API.getMemberInfo(user.id).then((response) => {
        if (basicDataJSON.dreidevInnerCircleUNames.indexOf(response.data.user.name) > -1) {
          bot.reply(message, 'T h e pants !! ');
        }
      }).catch((error) => {
        console.log(error);
      });
    });
  });

  // who-am-i-listener listener
  require('./who-am-i-listener')(controller);
  // testing listener
  require('./testruru-listener')(controller);
  // grocery-list listener
  require('./grocery-list-listener')(controller);
  // FALLBACK to cleverbot
  require('./fallback-cleverbot-listener')(controller);
};
