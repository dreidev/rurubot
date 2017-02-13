const axios = require('axios');

module.exports.getMembersList = function() {
    return axios.get('https://slack.com/api/users.list', {
        params: {
            token: process.env.SALCKBOT_API_TOKEN
        }
    });
};

module.exports.getMemberInfo = function(userID) {
    return axios.get('https://slack.com/api/users.info', {
        params: {
            token: process.env.SALCKBOT_API_TOKEN,
            user: userID
        }
    });
};

module.exports.getChannelsList = function() {
    return axios.get('https://slack.com/api/channels.list', {
        params: {
            token: process.env.SALCKBOT_API_TOKEN
        }
    });
};
