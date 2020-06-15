const router = require('express').Router();
const hash = require('bcryptjs');
const token = require('jsonwebtoken');

const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
  // implement registration
    const newUser = req.body;

    if(newUser.username || newUser.password) {
        const hashed =  hash.hashSync(newUser.password, 10);
        newUser.password = hashed;

        Users.insert(newUser)
          .then( user => {
              res.status(200).json({user})
          })
          .catch( err => {
              res.status(200).json({err})
          })

    } else {
      res.json({error: "Make sure to pass in username and password"});
    }



});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
