'usestrict';

const API = require('../../api');
const basicDataJSON = require('../../../data/basic-data.json');

module.exports = function(controller) {
  // pants function
  controller.hears([
    'what does nader miss (.*)', 'what do I miss (.*)',
  ], 'direct_message,direct_mention,mention', (bot, message) => {
    let name = message.match[1];
    controller.storage.users.get(message.user, (err, user) => {
      if (!user) {
        user = {
          id: message.user,
        };
      }
      user.name = name;
      API.getMemberInfo(user.id).then((response) => {
        if (basicDataJSON.dreidevInnerCircleUNames.indexOf(response.data.user.name) > -1) {
          bot.reply(message, 'T h e pants !! ');
        }
      }).catch((error) => {
        console.log(error);
      });
    });
  });
};
