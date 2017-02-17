'usestrict';

const nothingBefore = require('../utils/utils').nothingBeforeRegex;
const sentences = ['start timer for (.*)'];
const TogglClient = require('toggl-api');
const Conversations = require('../conversations/conversations');

module.exports = function(controller, db) {
  controller.hears(sentences.map(nothingBefore), 'direct_message,direct_mention,mention', (bot, message) => {
    console.log(message);
    db.find({
      user: message.user,
    }, function(err, data) {
      console.log(err);
      console.log(data);
      if (err) throw err;
      if (!data || data.length === 0) return Conversations.getTogglTokenConvo(message);

      const toggl = new TogglClient({
        apiToken: data[0].togglToken,
      });
      let splitMessage = message.text.split(' ');
      splitMessage.splice(0, 3);
      let task = splitMessage.join(' ');
      toggl.startTimeEntry({
        description: task,
        billable: false,
      }, function(err, timeEntry) {
        // handle error
        if (!err) return bot.reply(message, 'mkay, I started a timer for ' + task);
      });
    });
  });
};
