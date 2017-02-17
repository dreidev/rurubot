'usestrict';

require('dotenv').config();
// TODO make imports
// get controller instance
const controller = require('./bots/rurubot').controller;
// call listeners to listen for messages and respond appropriatly
const Datastore = require('nedb');
const homeDir = require('home-dir');
const db = new Datastore({filename: './keys.db', autoload: true});
require('./listeners/listeners')(controller, db);
// call sheduledJobs to do the shedule jobs on time
require('./sheduled-jobs/sheduled-jobs')();
