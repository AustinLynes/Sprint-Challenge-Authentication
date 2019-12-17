/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets')
module.exports = (req, res, next) => {

  const token = req.headers.authorization
  //require a token in the headers Authorization
  if (!token) {
    //if you didnt give me a token... then.. 
    res.status(401).json({ you: 'shall not pass!' });
  } else {
    if (!jwt.verify(token, secrets.jwtSecret)) {
      //else if you gave me a token and for some reason 
      //JWT cannot verify it.. then that means your being a 
      //bad panda....
      res.status(404).json({ alert: 'bad panda....' })
    }else{
      //move on to the next peice of middleware.. 
      next()
    }
  }

};
