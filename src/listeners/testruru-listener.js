'usestrict';

const API = require('../api');
const Conversations = require('../conversations/conversations');

module.exports = function(controller) {
  controller.hears([
    'testruru', 'testrurubot',
  ], 'direct_message,direct_mention,mention', (bot, message) => {
      API.getMembersList().then((response) => {
          const members = response.data.members;
          members.forEach((member) => {
              Conversations.workingDaysMoriningPrivConvo(member);
          });
      }).catch((error) => {
          console.log(error);
      });
  });
};
