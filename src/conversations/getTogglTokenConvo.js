'usestrict';

const rurubot = require('../bots/rurubot');
// get rurobot bot instance
const bot = rurubot.bot;
const Datastore = require('nedb');
const homeDir = require('home-dir');
const db = new Datastore({filename: '../keys.db', autoload: true});

module.exports = function(message) {
  bot.startConversation(message, (err, convo) => {
    if (!err) {
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
      }, {'key': 'apiToken'}); // store the results in a field called nickname
      convo.on('end', (convo) => {
        if (convo.status == 'completed') {
          let doc = {togglToken: convo.extractResponse('apiToken'), user: message.user};
          db.insert(doc, function(err, newDoc) { // Callback is optional
              if (err) throw err;
              bot.reply(message, 'Got it. You can time yourself with Toggl now.');
              console.log(newDoc);
          });
        } else {
          // this happens if the conversation ended prematurely for some reason
          bot.reply(message, 'OK, nevermind!');
        }
      });
    }
  });
};
