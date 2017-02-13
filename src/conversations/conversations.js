'use strict';
const rurubot = require('../bots/rurubot');
// get controller instance
const controller = rurubot.controller;
// get rurobot bot instance
const bot = rurubot.bot;


module.exports.workingDaysMoriningPrivConvo = function(member) {
    let memberWorkTodayList = [];
    if (member.name === 'tokyo') {
        bot.startPrivateConversation({
            user: member.id
        }, function(err, convo) {
            if (!err) {
                convo.say('Hello, ' + member.name);
                convo.ask('What are your working on today?', function(response, convo) {
                    convo.ask('Awesome, anything else?', [
                        {
                            pattern: 'yes',
                            callback: function(response, convo) {
                                console.log("------------ res");
                                console.log(response);
                                console.log("------------ res");
                                console.log("------------ conv");
                                console.log(convo);
                                console.log("------------ conv");
                            }
                        }, {
                            pattern: 'no',
                            callback: function(response, convo) {
                                // stop the conversation. this will cause it to end with status == 'stopped'
                                convo.next();
                            }
                        }, {
                            default: true,
                            callback: function(response, convo) {
                                console.log(response);
                                convo.repeat();
                                convo.next();
                            }
                        }
                    ]);

                    convo.next();

                }, {'key': 'nickname'}); // store the results in a field called nickname

                convo.on('end', function(convo) {
                    if (convo.status == 'completed') {
                        // this happens if the conversation ended normally
                        bot.say({
                            text: 'Okay, great. Good luck ' + member.name,
                            channel: member.id
                        });
                    } else {
                        // this happens if the conversation ended prematurely for some reason
                        bot.say({text: 'OK, nevermind!', channel: member.id});
                    }
                });
            }
        });

    }
};