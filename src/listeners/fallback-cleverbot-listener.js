'usestrict';

const cleverbot = require('../bots/cleverbot');

module.exports = function(controller, bot) {
  controller.hears('', 'direct_message,direct_mention,mention', (bot, message) => {
    cleverbot.ask(message.text, (err, response) => {
      if (!err) {
        bot.reply(message, response);
      } else {
        console.log('cleverbot err: ' + err);
      }
    });
  });
};
