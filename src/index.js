'usestrict';

require('dotenv').config()

// TODO make imports
// get controller instance
const controller = require('./rurubot').controller;
// call listeners to listen for messages and respond appropriatly
require('./listeners')(controller);
// call sheduledJobs to do the shedule jobs on time
require('./sheduled-jobs')();
