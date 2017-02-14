'usestrict';

const mongoose = require('mongoose');
const config = require('../../config/config');
// const jsonQuery = require('json-query');
const cleverbot = require('../bots/cleverbot');
const API = require('../api');

// models
const GroceryListItem = require('../models/grocery-list');

// const Conversations = require('../conversations/conversations');
// dreidev basic data
const basicDataJSON = require('../../data/basic-data.json');

module.exports = function(controller) {
  controller.hears([
    'call me (.*)', 'my name is (.*)',
  ], 'direct_message,direct_mention,mention', function(bot, message) {
    let name = message.match[1];
    controller.storage.users.get(message.user, function(err, user) {
      if (!user) {
        user = {
          id: message.user,
        };
      }
      user.name = name;
      controller.storage.users.save(user, function(err, id) {
        bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
      });
    });
  });

  // pants function
  controller.hears([
    'what does nader miss (.*)', 'what do I miss (.*)',
  ], 'direct_message,direct_mention,mention', function(bot, message) {
    let name = message.match[1];
    controller.storage.users.get(message.user, function(err, user) {
      if (!user) {
        user = {
          id: message.user,
        };
      }
      user.name = name;
      API.getMemberInfo(user.id).then(function(response) {
        if (basicDataJSON.dreidevInnerCircleUNames.indexOf(response.data.user.name) > -1) {
          bot.reply(message, 'T h e pants !! ');
        }
      }).catch(function(error) {
        console.log(error);
      });
    });
  });

  controller.hears([
    'what is my name', 'who am i',
  ], 'direct_message,direct_mention,mention', function(bot, message) {
    controller.storage.users.get(message.user, function(err, user) {
      if (user && user.name) {
        bot.reply(message, 'Your name is ' + user.name);
      } else {
        bot.startConversation(message, function(err, convo) {
          if (!err) {
            convo.say('I do not know your name yet!');
            convo.ask('What should I call you?', function(response, convo) {
              convo.ask('You want me to call you `' + response.text + '`?', [
                {
                  pattern: 'yes',
                  callback: function(response, convo) {
                    // since no further messages are queued after this,
                    // the conversation will end naturally with status == 'completed'
                    convo.next();
                  },
                }, {
                  pattern: 'no',
                  callback: function(response, convo) {
                    // stop the conversation. this will cause it to end with status == 'stopped'
                    convo.stop();
                  },
                }, {
                  default: true,
                  callback: function(response, convo) {
                    convo.repeat();
                    convo.next();
                  },
                },
              ]);

              convo.next();
            }, {'key': 'nickname'}); // store the results in a field called nickname
            convo.on('end', function(convo) {
              if (convo.status == 'completed') {
                bot.reply(message, 'OK! I will update my dossier...');

                controller.storage.users.get(message.user, function(err, user) {
                  if (!user) {
                    user = {
                      id: message.user,
                    };
                  }
                  user.name = convo.extractResponse('nickname');
                  controller.storage.users.save(user, function(err, id) {
                    bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
                  });
                });
              } else {
                // this happens if the conversation ended prematurely for some reason
                bot.reply(message, 'OK, nevermind!');
              }
            });
          }
        });
      }
    });
  });

  // testing function
  controller.hears([
    'testruru', 'testrurubot',
  ], 'direct_message,direct_mention,mention', function(bot, message) {
      // const channels = response.data.channels;
      // const testChannelId = jsonQuery('[name=test-dreidev]', {data: channels}).value.id;
      // console.log('channel id: ' + testChannelId);
      bot.reply(message, 'You triggered the rorobot test command, like you need to DUH, I\'m working fine !!');
    // require('../develop')();
  });


  // grocery list function
  controller.hears([
    'add (.*) to grocery list',
    'add (.*) to grocery-list',
    'add (.*) to groceries',
    'add (.*) to ([^"\r\n]*) grocery list',
  ], 'direct_message,direct_mention,mention', function(bot, message) {
      let itemName = message.match[1];
      bot.reply(message, `Okay I added ${itemName} to the grocery list.`);
      mongoose.connect(config.MONGO_URI);
      let groceryListItem = new GroceryListItem({
        name: itemName,
        state: 'notChecked',
        user_id: message.user,
      });
      groceryListItem.save(function(err, result) {
        if (err) {
          console.log(err);
          bot.reply(message, `uhm, Sorry but I couldn't add ${itemName} to the grocery list.`);
        } else {
          console.log(result);
        }
      });
      mongoose.disconnect();
  });

  // FALLBACK to cleverbot

  controller.hears('', 'direct_message,direct_mention,mention', function(bot, message) {
    // let msg = message.text;
    cleverbot.ask(message.text, function(err, response) {
      if (!err) {
        bot.reply(message, response);
      } else {
        console.log('cleverbot err: ' + err);
      }
    });
  });
};
