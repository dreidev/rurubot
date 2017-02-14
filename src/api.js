'use strict';
const axios = require('axios');

const SLACK_API_URL = 'https://slack.com/api/';

module.exports.getMembersList = () => {
  return axios.get(SLACK_API_URL + 'users.list', {
    params: {
      token: process.env.SALCKBOT_API_TOKEN,
    },
  });
};

module.exports.getMemberInfo = (userID) => {
  return axios.get(SLACK_API_URL + 'users.info', {
    params: {
      token: process.env.SALCKBOT_API_TOKEN,
      user: userID,
    },
  });
};

module.exports.getChannelsList = () => {
  return axios.get(SLACK_API_URL + 'channels.list', {
    params: {
      token: process.env.SALCKBOT_API_TOKEN,
    },
  });
};

// 3rd parties

// module.exports.getRandomWord = function(word) {
//   return axios.get('https://wordsapiv1.p.mashape.com/words/${word}/synonyms', {
//     params: {
//       random: true,
//     },
//     headers: {'X-Mashape-Key': process.env.WORDSAPI_API_KEY},
//   });
// };
