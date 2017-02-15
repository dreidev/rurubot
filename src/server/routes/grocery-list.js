const router = require('express').Router();
// const moment = require('moment');
const fs = require('fs');
// const jwt = require('jwt-simple');

const config = require('../../../config/config');
const GroceryListItem = require('../../models/grocery-list');
const axios = require('axios');
// const querystring = require('querystring');



/*
|--------------------------------------------------------------------------
| Get all grocery list
|--------------------------------------------------------------------------
*/
router.get('/api/grocery-list', function(req, res, next) {
 GroceryListItem.find().then( function(groceryListItem) {
   if (!groceryListItem) {
     return res.status(404).send({message: "not found"})
   }
   res.send(groceryListItem)
 }).catch( function(error) {
   next(error)
 })
});

/*
|--------------------------------------------------------------------------
| Get grocery list items by state
|--------------------------------------------------------------------------
*/
router.get('/api/grocery-list/state/:state', function(req, res, next) {
 GroceryListItem.find({'state': req.params.state}).then( function(groceryListItem) {
   if (!groceryListItem) {
     return res.status(404).send({message: "groceryListItem not found"})
   }
   res.send(groceryListItem)
 }).catch( function(error) {
   next(error)
 })
});

/*
|--------------------------------------------------------------------------
| Get grocery list items by user
|--------------------------------------------------------------------------
*/
router.get('/api/grocery-list/user/:user_id', function(req, res, next) {
 GroceryListItem.find({'user_id': req.params.user_id}).then( function(groceryListItems) {
   if (!groceryListItems) {
     return res.status(404).send({message: "groceryListItems not found"})
   }
   res.send(groceryListItems)
 }).catch( function(error) {
   next(error)
 })
});

/*
|--------------------------------------------------------------------------
| Post grocery list item
|--------------------------------------------------------------------------
*/

router.post('/api/grocery-list/create', function(req, res) {
  console.log(req);
    GroceryListItem.create({
      name: req.body.name,
      state: req.body.state || 'notChecked',
      user_id: req.body.user_id,
    }).then(function (result) {
      res.status(201).send(result._id);
    }).catch(function (err) {
      res.status(500).send({ message: err.message });
    })
  });

module.exports = router
