'usestrict';

const Conversations = require('../conversations/conversations');
const matchExact = require('../utils/utils').matchExactRegex;
const sentences = ['what is my name', 'who am i'];

module.exports = function(controller) {
  controller.hears(sentences.map(matchExact), 'direct_message,direct_mention,mention', (bot, message) => {
    controller.storage.users.get(message.user, (err, user) => {
      if (user && user.name) {
        bot.reply(message, 'Your name is ' + user.name);
      } else {
        Conversations.whatShouldICallYouConvo(message);
      }
    });
  });
};
