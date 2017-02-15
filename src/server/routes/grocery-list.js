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
| Get all daily tasks
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
})

module.exports = router
