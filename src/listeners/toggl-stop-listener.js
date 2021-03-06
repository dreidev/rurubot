'usestrict';
const mongoose = require('mongoose');
const togglTokens = require('../models/toggl-token');
const config = require('../../config/config');
const Cryptr = require('cryptr');
const nothingBefore = require('../utils/utils').nothingBeforeRegex;
const timeFormatter = require('../utils/utils').timeFormatter;
const sentences = ['stop timer for (.*)'];
const TogglClient = require('toggl-api');
const Conversations = require('../conversations/conversations');

module.exports = function(controller) {
  controller.hears(sentences.map(nothingBefore), 'direct_message,direct_mention,mention', (bot, message) => {
    mongoose.connect(config.MONGO_URI);
    const cryptrInstance = new Cryptr(message.user);
    togglTokens.find({
      user: message.user,
    }, (err, data) => {
           if (err) {
             mongoose.disconnect();
             throw err;
           }
           if (!data || data.length === 0) {
                return Conversations.getTogglTokenConvo(message);
           }
      const toggl = new TogglClient({
        apiToken: cryptrInstance.decrypt(data[0].token),
      });
      let splitMessage = message.text.split(' ');
      splitMessage.splice(0, 3);
      let task = splitMessage.join(' ');
      toggl.getCurrentTimeEntry((err, data) => {
        if(!data) return bot.reply(message, 'I could not find that task');
        toggl.stopTimeEntry(data.id, (err, stopTimeEntry) => {
          mongoose.disconnect();
          // handle error
          if(err) return bot.reply(message, 'I could not find that task');
          bot.reply(message, 'stopped timer for ' + task + '\nTime taken: ' + timeFormatter(stopTimeEntry.duration));
        });
      });
    });
  });
};
