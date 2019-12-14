const router = require('express').Router();
const Users = require('../helpers/auth-helper')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const generateToken = require('./generateToken')

router.post('/register', (req, res) => {
  // implement registration
  const user = req.body
  const hash = bcrypt.hashSync(user.password, 16)
  user.password = hash

  Users.add(user).then((_user) => {
    if (!_user) {
      res.status(400).json({ alert: 'error with user...' })
    } else {
      res.status(201).json({ confirm: 'users has been created'})
    }
  }).then((_err) => {
    res.status(500).end()
  })
});

router.post('/login',  (req, res) => {
  // implement login
  const credentials = req.body
  Users.find(credentials.username)
    .then((_user) => {
      if (_user && bcrypt.compareSync(credentials.password, _user.password)) {
        //geneerate a token.. 
        const token = generateToken(_user)
        res.status(201).json({ confirm: 'login successful, heres a token...', token })
      } else {
        res.status(400).json({ alert: 'invalid credentials' })
      }
    }).catch((_err) => {
      console.log(_err)
      res.status(500).json(_err)
    })
});



module.exports = router;
