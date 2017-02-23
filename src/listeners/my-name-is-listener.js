'usestrict';

const nothingBefore = require('../utils/utils').nothingBeforeRegex;
const sentences = ['call me (.*)', 'my name is (.*)'];

module.exports = function(controller) {
  controller.hears(sentences.map(nothingBefore), 'direct_message,direct_mention,mention', (bot, message) => {
    let splitMessage = message.text.split(' ');
    splitMessage.splice(0, 2);
    let name = splitMessage.join(' ');
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
};
