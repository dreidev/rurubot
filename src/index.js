'use strict';

require('dotenv').config()

const schedule = require('node-schedule');
const jsonQuery = require('json-query');
// dreidev basic data
const basicDataJSON = require('../data/basic-data.json');
// TODO make imports
const cleverbot = require('./cleverbot');
const rurubot = require('./rurubot');
const API = require('./api');
const Conversations = require('./conversations');
// sheduler rules
const shedulerRules = require('./scheduler-rules');


// get controller instance
const controller = rurubot.controller;

// get rurobot bot instance
const bot = rurubot.bot;

controller.hears([
    'call me (.*)', 'my name is (.*)'
], 'direct_message,direct_mention,mention', function(bot, message) {
    let name = message.match[1];
    controller.storage.users.get(message.user, function(err, user) {
        if (!user) {
            user = {
                id: message.user
            };
        }
        user.name = name;
        controller.storage.users.save(user, function(err, id) {
            bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
        });
    });
});

// pants function
controller.hears([
    'what does nader miss (.*)', 'what do I miss (.*)'
], 'direct_message,direct_mention,mention', function(bot, message) {
    let name = message.match[1];
    controller.storage.users.get(message.user, function(err, user) {
        if (!user) {
            user = {
                id: message.user
            };
        }
        user.name = name;
        API.getMemberInfo(user.id).then(function(response) {
            if (basicDataJSON.dreidevInnerCircleUNames.indexOf(response.data.user.name) > -1) {
                bot.reply(message, 'T h e pants !! ');
            }
        }).catch(function(error) {
            console.log(error);
        });
    });
});

controller.hears([
    'what is my name', 'who am i'
], 'direct_message,direct_mention,mention', function(bot, message) {

    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.reply(message, 'Your name is ' + user.name);
        } else {
            bot.startConversation(message, function(err, convo) {
                if (!err) {
                    convo.say('I do not know your name yet!');
                    convo.ask('What should I call you?', function(response, convo) {
                        convo.ask('You want me to call you `' + response.text + '`?', [
                            {
                                pattern: 'yes',
                                callback: function(response, convo) {
                                    // since no further messages are queued after this,
                                    // the conversation will end naturally with status == 'completed'
                                    convo.next();
                                }
                            }, {
                                pattern: 'no',
                                callback: function(response, convo) {
                                    // stop the conversation. this will cause it to end with status == 'stopped'
                                    convo.stop();
                                }
                            }, {
                                default: true,
                                callback: function(response, convo) {
                                    convo.repeat();
                                    convo.next();
                                }
                            }
                        ]);

                        convo.next();

                    }, {'key': 'nickname'}); // store the results in a field called nickname

                    convo.on('end', function(convo) {
                        if (convo.status == 'completed') {
                            bot.reply(message, 'OK! I will update my dossier...');

                            controller.storage.users.get(message.user, function(err, user) {
                                if (!user) {
                                    user = {
                                        id: message.user
                                    };
                                }
                                user.name = convo.extractResponse('nickname');
                                controller.storage.users.save(user, function(err, id) {
                                    bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
                                });
                            });

                        } else {
                            // this happens if the conversation ended prematurely for some reason
                            bot.reply(message, 'OK, nevermind!');
                        }
                    });
                }
            });
        }
    });
});

// testing function
controller.hears([
    'testruru', 'testrurubot'
], 'direct_message,direct_mention,mention', function(bot, message) {
    API.getChannelsList().then(function(response) {
        const channels = response.data.channels;
        const testChannelId = jsonQuery('[name=test-dreidev]', {data: channels}).value.id;
        console.log('channel id: ' + testChannelId);
        bot.say({
            text: 'You triggered the rorobot test command, like you need to DUH, I\'m working fine !!', channel: testChannelId // a valid slack channel, group, mpim, or im ID
        });
    }).catch(function(error) {
        console.log(error);
    });
});

// testing users function
controller.hears([
    'testUsers', 'testFunc'
], 'direct_message,direct_mention,mention', function(bot, message) {
    API.getMembersList().then(function(response) {
        const members = response.data.members;
        members.forEach(function(member) {
            if (!member.deleted && member.name === 'tokyo') {
                bot.say({
                    text: 'Hi, ' + member.name + '\nWhat are you working on today?',
                    channel: member.id // a valid slack channel, group, mpim, or im ID
                });
            }
        });
    }).catch(function(error) {
        console.log(error);
    });
});

// FALLBACK to cleverbot

controller.hears('', 'direct_message,direct_mention,mention', function(bot, message) {
    // let msg = message.text;
    cleverbot.ask(message.text, function(err, response) {
        if (!err) {
            bot.reply(message, response);
        } else {
            console.log('cleverbot err: ' + err);
        }
    });
})

let scheduleMornigWorkCheckupQuestion = schedule.scheduleJob(shedulerRules.workingDaysMoriningRule, function() {
    API.getMembersList().then(function(response) {
        const members = response.data.members;
        members.forEach(function(member) {
            Conversations.workingDaysMoriningPrivConvo(member);
        });
    }).catch(function(error) {
        console.log(error);
    });
});
