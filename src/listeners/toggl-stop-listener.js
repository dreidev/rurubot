'usestrict';

const nothingBefore = require('../utils/utils').nothingBeforeRegex;
const timeFormatter = require('../utils/utils').timeFormatter;
const sentences = ['stop timer for (.*)'];
const TogglClient = require('toggl-api');
let apiToken = null;
const toggl = new TogglClient({
  apiToken: '8ce160d997ccf8547060f3d51464fa7d'
});
var tasks = [];
module.exports = function(controller) {
  controller.hears(sentences.map(nothingBefore), 'direct_message,direct_mention,mention', (bot, message) => {
    let splitMessage = message.text.split(" ");
    splitMessage.splice(0,3);
    let task = splitMessage.join(" ");
    toggl.getCurrentTimeEntry(function (err, data) {
      if(!data) return bot.reply(message, "I couldn't find that task");

      toggl.stopTimeEntry(data.id, function(err, stopTimeEntry) {
        // handle error
        if(err) return bot.reply(message, "I couldn't find that task");
        bot.reply(message, "stopped timer for " + task + "\nit took you " + timeFormatter(stopTimeEntry.duration) + " to finish this task. :unamused:");
      })
    })
  });
};
