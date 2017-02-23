// eslint-disable-next-line
const router = require('express').Router();
// const moment = require('moment');
// const fs = require('fs');
// const jwt = require('jwt-simple');

// const config = require('../../../config/config');
const DailyTasks = require('../../models/daily-tasks');
// const axios = require('axios');
// const querystring = require('querystring');

/*
|--------------------------------------------------------------------------
| Get all daily tasks
|--------------------------------------------------------------------------
*/
router.get('/api/daily-tasks', (req, res, next) => {
  DailyTasks.find().then(function(dailyTasks) {
    if (!dailyTasks) {
      return res.status(404).send({message: 'User not found'});
    }
    res.send(dailyTasks);
  }).catch((error) => {
    next(error);
  });
});

/*
|--------------------------------------------------------------------------
| Get Daily task by user
|--------------------------------------------------------------------------
*/
router.get('/api/daily-tasks/user/:id', (req, res, next) => {
  DailyTasks.find({'user_id': req.params.id}).then((dailyTasks) => {
    if (!dailyTasks) {
      return res.status(404).send({message: 'daily tasks not found'});
    }
    res.send(dailyTasks);
  }).catch((error) => {
    next(error);
  });
});

/*
|--------------------------------------------------------------------------
| Post a daily task
|--------------------------------------------------------------------------
*/
router.post('/api/daily-tasks', (req, res, next) => {
  DailyTasks.create({
    user_id: req.body.user_id,
    tasks: req.body.tasks,
  }).then((result) => {
    res.status(201).send(result._id);
  }).catch((err) => {
    res.status(500).send({message: err.message});
  });
});

module.exports = router;
