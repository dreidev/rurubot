'use strict';
// cleverbot instance (for fallback)
const cleverbot = new(require("cleverbot.io"))(process.env.CLEVERBOT_API_USER, process.env.CLEVERBOT_API_KEY);
cleverbot.setNick("Dry");
cleverbot.create(function(err, session) {
    if (err) {
        console.log('cleverbot create fail.');
    } else {
        console.log('cleverbot create success.');
    }
});

module.exports = cleverbot;
