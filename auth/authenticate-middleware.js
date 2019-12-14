/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets')
module.exports = (req, res, next) => {

  const token = req.headers.authorization

  if (!token) {
    res.status(401).json({ you: 'shall not pass!' });
  } else {
    if (!jwt.verify(token, secrets.jwtSecret)) {
      res.status(404).json({ alert: 'bad_panda....' })
    }else{
      next()
    }
  }

};
