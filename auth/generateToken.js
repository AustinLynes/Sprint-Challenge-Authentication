const secrets = require('../config/secrets')
const jwt = require('jsonwebtoken')

module.exports = 
function generateToken(user){

  const payload = {
    subject:user.id,
    username:user.username
  }
  const options = {
    expiresIn:'8h'
  }
  
  return jwt.sign(payload, secrets.jwtSecret, options)
}
