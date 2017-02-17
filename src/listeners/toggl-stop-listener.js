'usestrict';

const nothingBefore = require('../utils/utils').nothingBeforeRegex;
const timeFormatter = require('../utils/utils').timeFormatter;
const sentences = ['stop timer for (.*)'];
const TogglClient = require('toggl-api');
const Conversations = require('../conversations/conversations');

module.exports = function(controller, db) {
  controller.hears(sentences.map(nothingBefore), 'direct_message,direct_mention,mention', (bot, message) => {
    db.find({
      user: message.user,
    }, function(err, data) {
      if (err) throw err;
      if (!data || data.length === 0) return Conversations.getTogglTokenConvo(message);

      const toggl = new TogglClient({
        apiToken: data[0].togglToken,
      });

      let splitMessage = message.text.split(' ');
      splitMessage.splice(0, 3);
      let task = splitMessage.join(' ');
      toggl.getCurrentTimeEntry(function(err, data) {
        if (!data) return bot.reply(message, 'I could not find that task');

        toggl.stopTimeEntry(data.id, function(err, stopTimeEntry) {
          // handle error
          if (err) return bot.reply(message, 'I could not find that task');
          bot.reply(message, 'stopped timer for ' + task + '\nTime taken: ' + timeFormatter(stopTimeEntry.duration));
        });
      });
    });
  });
};
