'usestrict';
const rurubot = require('../bots/rurubot');
// get rurobot bot instance
const togglTokens = require('../models/toggl-token');
const bot = rurubot.bot;
const mongoose = require('mongoose');
// crypt
const Cryptr = require('cryptr');
module.exports = function(message) {
  bot.startConversation(message, (err, convo) => {
    if(!err) {
      convo.say('I do not have your toggl token yet though');
      convo.ask('Could I have it please?', (response, convo) => {
        convo.ask('Is your token `' + response.text + '`?', [
          {
            pattern: 'yes',
            callback: (response, convo) => {
              // since no further messages are queued after this,
              // the conversation will end naturally with status == 'completed'
              convo.next();
            },
          }, {
            pattern: 'no',
            callback: (response, convo) => {
              // stop the conversation. this will cause it to end with status == 'stopped'
              convo.stop();
            },
          }, {
            default: true,
            callback: (response, convo) => {
              convo.repeat();
              convo.next();
            },
          },
        ]);
        convo.next();
      }, {
        'key': 'apiToken',
      });
      // store the results in a field called nickname
      convo.on('end', (convo) => {
        if(convo.status == 'completed') {
          const cryptrInstance = new Cryptr(convo.context.user);
          const hash = cryptrInstance.encrypt(convo.extractResponse('apiToken'));
          let doc = {
            token: hash,
            user: message.user,
          };
          togglTokens.create(doc, function(err, newDoc) { // Callback is optional
                 mongoose.disconnect();
            if(err) throw err;
            bot.reply(message, 'Got it. You can time yourself with Toggl now.');
          });
        } else {
          // this happens if the conversation ended prematurely for some reason
          bot.reply(message, 'OK, nevermind!');
          mongoose.disconnect();
   }
});
    }
  });
};
