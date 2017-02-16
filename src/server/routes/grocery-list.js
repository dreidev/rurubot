const router = require('express').Router();
// const moment = require('moment');
// const fs = require('fs');
// const jwt = require('jwt-simple');
const config = require('../../../config/config');
const GroceryListItem = require('../../models/grocery-list');
// const axios = require('axios');
// const querystring = require('querystring');



/*
|--------------------------------------------------------------------------
| Get all grocery list
|--------------------------------------------------------------------------
*/
router.get('/api/grocery-list', (req, res, next) => {
 GroceryListItem.find().then((groceryListItem) => {
   if (!groceryListItem) {
     return res.status(404).send({message: 'not found'})
   }
   res.send(groceryListItem)
 }).catch( function(error) {
   next(error)
 })
});

/*
|--------------------------------------------------------------------------
| Get grocery list item by id
|--------------------------------------------------------------------------
*/
router.get('/api/grocery-list/:id', (req, res, next) => {
  GroceryListItem.findById(req.params.id).then((groceryListItem) => {
    if(groceryListItem){
      res.status(200).send(groceryListItem);
    }else{
      res.sendStatus(404);
    }
  });
});


/*
|--------------------------------------------------------------------------
| Get grocery list items by state
|--------------------------------------------------------------------------
*/
router.get('/api/grocery-list/state/:state',(req, res, next) => {
 GroceryListItem.find({'state': req.params.state}).then((groceryListItem) => {
   if (!groceryListItem) {
     return res.status(404).send({message: 'groceryListItem not found'})
   }
   res.send(groceryListItem)
 }).catch((error) => {
   next(error)
 })
});

/*
|--------------------------------------------------------------------------
| Get grocery list items by user
|--------------------------------------------------------------------------
*/
router.get('/api/grocery-list/user/:user_id', (req, res, next) => {
 GroceryListItem.find({'user_id': req.params.user_id}).then((groceryListItems) => {
   if (!groceryListItems) {
     return res.status(404).send({message: 'groceryListItems not found'})
   }
   res.send(groceryListItems)
 }).catch((error) => {
   next(error)
 })
});

/*
|--------------------------------------------------------------------------
| Post grocery list item
|--------------------------------------------------------------------------
*/

router.post('/api/grocery-list/create',(req, res) => {
    GroceryListItem.create({
      name: req.body.name,
      state: req.body.state || 'notChecked',
      user_id: req.body.user_id,
    }).then((result) => {
      res.status(201).send(result._id);
    }).catch((err) => {
      res.status(500).send({ message: err.message });
    })
  });

/*
|--------------------------------------------------------------------------
| Update grocery list item
|--------------------------------------------------------------------------
*/

router.put('/api/grocery-list/:id/check', (req, res) => {
  GroceryListItem.findById(req.params.id).then((groceryListItem) => {
    if(groceryListItem){
      groceryListItem.state = 'checked';
      groceryListItem.save();
      res.sendStatus(200);
    }else{
      res.sendStatus(404);
    }
  })
});

/*
|--------------------------------------------------------------------------
| Update grocery list item
|--------------------------------------------------------------------------
*/

router.put('/api/grocery-list/:id/uncheck',(req, res) => {
  GroceryListItem.findById(req.params.id).then((groceryListItem) => {
    if(groceryListItem){
      groceryListItem.state = 'unChecked';
      groceryListItem.save();
      res.sendStatus(200);
    }else{
      res.sendStatus(404);
    }
  })
});

module.exports = router
