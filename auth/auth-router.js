const router = require('express').Router();
const hash = require('bcryptjs');

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
  //login
  let { username, password } = req.body;

  Users.findBy({username})
    .first()
    .then(user => {
      if(user && hash.compareSync(password, user.password)){
        //we store the results from generate token here
        req.session.user = user; 
        res.status(200).json({
          message: `Welcome ${user.username}!`,
        
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
  
});


module.exports = router;
