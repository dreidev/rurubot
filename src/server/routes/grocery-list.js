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
router.get('/api/grocery-list/:state', function(req, res, next) {
 GroceryListItem.find({'state': req.params.state}).then( function(groceryListItem) {
   if (!groceryListItem) {
     return res.status(404).send({message: "groceryListItem not found"})
   }
   res.send(groceryListItem)
 }).catch( function(error) {
   next(error)
 })
});

module.exports = router
