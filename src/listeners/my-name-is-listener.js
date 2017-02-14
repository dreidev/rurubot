'usestrict';

module.exports = function (controller){
  controller.hears([
    'call me (.*)', 'my name is (.*)',
  ], 'direct_message,direct_mention,mention', (bot, message) => {
    let name = message.match[1];
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
