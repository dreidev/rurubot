const axios = require('axios');

const SLACK_API_URL = 'https://slack.com/api/';

module.exports.getMembersList = function() {
    return axios.get(SLACK_API_URL + 'users.list', {
        params: {
            token: process.env.SALCKBOT_API_TOKEN
        }
    });
};

module.exports.getMemberInfo = function(userID) {
    return axios.get(SLACK_API_URL + 'users.info', {
        params: {
            token: process.env.SALCKBOT_API_TOKEN,
            user: userID
        }
    });
};

module.exports.getChannelsList = function() {
    return axios.get(SLACK_API_URL + 'channels.list', {
        params: {
            token: process.env.SALCKBOT_API_TOKEN
        }
    });
};
