'use strict';
const Botkit = require('botkit');

// start bot logic
const controller = Botkit.slackbot({debug: true});

// bot instance
const bot = controller.spawn({token: process.env.SALCKBOT_TOKEN}).startRTM();

module.exports.bot = bot;

module.exports.controller = controller;
