const router = require('express').Router();
// const moment = require('moment');
// const fs = require('fs');
// const jwt = require('jwt-simple');
// const config = require('../../../config/config');
const Project = require('../../models/project');
// const axios = require('axios');
// const querystring = require('querystring');

/*
|--------------------------------------------------------------------------
| Get all projects
|--------------------------------------------------------------------------
*/
router.get('/api/projects', (req, res, next) => {
  Project.find().then((project) => {
    if (!project) {
      return res.status(404).send({message: 'not found'});
    }
    res.send(project);
  }).catch(function(error) {
    next(error);
  });
});

module.exports = router;
