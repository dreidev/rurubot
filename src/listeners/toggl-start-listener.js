'usestrict';

const nothingBefore = require('../utils/utils').nothingBeforeRegex;
const sentences = ['start timer for (.*)'];
const TogglClient = require('toggl-api');
const toggl = new TogglClient({
  apiToken: '8ce160d997ccf8547060f3d51464fa7d'
});

module.exports = function(controller) {
  controller.hears(sentences.map(nothingBefore), 'direct_message,direct_mention,mention', (bot, message) => {
    let splitMessage = message.text.split(" ");
    splitMessage.splice(0,3);
    let task = splitMessage.join(" ");
    toggl.startTimeEntry({
      description: task,
      billable: false
    }, function(err, timeEntry) {
      // handle error
      if(!err) return bot.reply(message, "mkay, I started a timer for " + task);

    })
  });
};
