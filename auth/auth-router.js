const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
  // implement registration

  let user = req.body;

  console.log(user, 'from inside register');

  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;


  Users.add(user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json(error);
    });

});

router.post('/login', (req, res) => {
  // implement login

  let {username, password } = req.body;

  Users.findBy({username})
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)){
        
          res.status(200).json({
              message: `Welcome ${user.username}`
          })
      } else {
          res.status(401).json({message:'Invalid Credentials'});
      }
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

module.exports = router;
