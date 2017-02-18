const router = require('express').Router();
// const moment = require('moment');
// const fs = require('fs');
// const jwt = require('jwt-simple');
//
// const config = require('../config/config');
const User = require('../models/user');
// const Auth = require('../routes/authentication');
// const axios = require('axios');
// const querystring = require('querystring');


/*
|--------------------------------------------------------------------------
| Get user by ID
|--------------------------------------------------------------------------
*/
router.get('/api/users/:id', (req, res, next) => {
  User.findById(req.params.id).then((user) => {
   if (!user) {
     return res.status(404).send({message: 'User not found'});
   }
   res.send(user);
  }).catch((error) => {
   next(error);
  });
});

/*
|--------------------------------------------------------------------------
| Get user by Slack ID
|--------------------------------------------------------------------------
*/
router.get('/api/users/slack/:id', (req, res, next) => {
  User.find({slack_id: req.params.id}).then((user) => {
   if (!user) {
     return res.status(404).send({message: 'User not found'});
   }
   res.send(user);
  }).catch((error) => {
   next(error);
  });
});


// /*
//  |--------------------------------------------------------------------------
//  | GET /api/me
//  |--------------------------------------------------------------------------
//  */
// router.get('/api/me', Auth.ensureAuthenticated, function(req, res) {
//   User.findById(req.user_id, function(err, user) {
//     res.send(user);
//   });
// });
//
//   /*
//    |--------------------------------------------------------------------------
//    | PUT /api/me
//    |--------------------------------------------------------------------------
//    */
// router.put('/api/me', Auth.ensureAuthenticated, function(req, res) {
//   console.log('here');
//   let updatedUser = null;
//     User.findById(req.user_id).exec().then(function(user) {
//       updatedUser = Object.assign(user,req.body)
//       return user.update(req.body);
//     }).then( function(user) {
//       res.status(200).send(updatedUser);
//     })
// });
//

// /*
//  |--------------------------------------------------------------------------
//  | Log in with Email
//  |--------------------------------------------------------------------------
//  */
// router.post('/api/auth/login', function(req, res) {
//   User.findOne({ email: req.body.email }, '+password', function(err, user) {
//     if (!user) {
//       return res.status(401).send({ message: 'Invalid email and/or password' });
//     }
//     user.comparePassword(req.body.password, function(err, isMatch) {
//       if (!isMatch) {
//         return res.status(401).send({ message: 'Invalid email and/or password' });
//       }
//       res.send({ token: Auth.createJWT(user) });
//     });
//   });
// });
//
// /*
//  |--------------------------------------------------------------------------
//  | Create Email and Password Account
//  |--------------------------------------------------------------------------
//  */
// router.post('/api/auth/signup', function(req, res) {
//   User.findOne({ email: req.body.email }, function(err, existingUser) {
//     if (existingUser) {
//       return res.status(409).send({ message: 'Email is already taken' });
//     }
//     var user = new User(req.body);
//     user.profile_photo = `/static/user-profile-default.svg`
//     user.save(function(err, result) {
//       if (err) {
//         res.status(500).send({ message: err.message });
//       }
//       res.send({ token: Auth.createJWT(result) });
//     });
//   });
// });
//
// router.post('/api/auth/facebook', function(req, res, next) {
//   var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
//   var accessTokenUrl = 'https://graph.facebook.com/v2.8/oauth/access_token';
//   var graphApiUrl = 'https://graph.facebook.com/v2.8/me?fields=' + fields.join(',');
//   var params = {
//     code: req.body.code,
//     client_id: req.body.clientId,
//     client_secret: config.FACEBOOK_SECRET,
//     redirect_uri: req.body.redirectUri
//   };
//   axios.get(accessTokenUrl, {
//     params
//   }).then(function(response){
//     return axios.get(graphApiUrl, {
//       params: {access_token : response.data.access_token}
//     })
//   })
//   .then(response=>{
//     let { email, first_name, last_name} = response.data
//     return User.findOne({email}).then(user=>{
//       if (user) {
//         return user
//       } else{
//         return User.create({
//           email, first_name, last_name
//         })
//       }
//     })
//   })
//   .then(user=>res.send({ token: Auth.createJWT(user) }))
//   .catch(error=>{
//     console.log( error);
//     next(error)
//   })
// });

module.exports = router;