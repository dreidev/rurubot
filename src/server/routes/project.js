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


/*
|--------------------------------------------------------------------------
| Get project by id
|--------------------------------------------------------------------------
*/
router.get('/api/project/:id', (req, res, next) => {
  Project.findById(req.params.id).then((project) => {
    if (project) {
      res.status(200).send(project);
    } else {
      res.sendStatus(404);
    }
  });
});

/*
|--------------------------------------------------------------------------
| Get projects by name
|--------------------------------------------------------------------------
*/
router.get('/api/project/name/:name', (req, res, next) => {
  Project.find({name: req.params.name}).then((projects) => {
    if (projects) {
      res.status(200).send(projects);
    } else {
      res.sendStatus(404);
    }
  });
});

/*
|--------------------------------------------------------------------------
| Post project
|--------------------------------------------------------------------------
*/

router.post('/api/project', (req, res) => {
  Project.create({
    name: req.body.name,
    category: req.body.category,
    client: req.body.client,
  }).then((result) => {
    res.status(201).send(result._id);
  }).catch((err) => {
    res.status(500).send({message: err.message});
  });
});

module.exports = router;
