'usestrict';
const matchExact = require('../utils/utils').matchExactRegex;
const sentences = ['address', 'where is dreidev', 'where do you live'];
module.exports = function(controller) {
  controller.hears(sentences.map(matchExact), 'direct_message,direct_mention,mention', (bot, message) => {
    bot.reply(message, 'التجمع الخامس، الحى الثانى، المنطقة الثالثة، فيلا ٥٠');
  });
};
