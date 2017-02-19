const jwt = require('jwt-simple');
const moment = require('moment');

const config = require('../../../config/config');

/*
 |--------------------------------------------------------------------------
 | Login Required Middleware
 |--------------------------------------------------------------------------
 */
function ensureAuthenticated(req, res, next) {
  if (!req.header('Authorization')) {
    return res.status(401).send({message: 'Please make sure your request has an Authorization header'});
  }
  let token = req.header('Authorization').split(' ')[1];

  let payload = null;
  try {
    payload = jwt.decode(token, config.TOKEN_SECRET);
  } catch (err) {
    return res.status(401).send({message: err.message});
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({message: 'Token has expired'});
  }
  req.user_id = payload.user_id;
  next();
}

/*
 |--------------------------------------------------------------------------
 | Generate JSON Web Token
 |--------------------------------------------------------------------------
 */
function createJWT(user) {
  const payload = {
    user_id: user._id,
    slack_id: user.slack_id,
    user_level: user.user_level,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix(),
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}

module.exports = {
  ensureAuthenticated,
  createJWT,
};
