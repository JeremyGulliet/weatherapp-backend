var express = require('express');
var router = express.Router();

const fetch = require('node-fetch');
const User = require('../models/users');

const {checkBody} = require("../modules/checkBody");




// Route POST signUP

router.post('/signup', (req, res) => {
    // Verifie si le signup est valide
  if (!checkBody(req.body, ["name", "email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields"})
    return;
  }
    // Verifie si l'utilisateur est déjà enregistré
    User.findOne({email: req.body.email}).then(data => {
      if (data === null){
        const newUser = new User({
          name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
      newUser.save().then(() => {
        res.json({result: true});
      })

      } else{
        res.json({result: false, error: 'User already exists'})
      }
    });
  });
    

// Route POST signin

    router.post('/signin', (req, res) => {
      if (!checkBody(req.body, ["email", "password"])) {
        res.json({ result: false, error: "Missing or empty fields"})
        return;
      }
        User.findOne({ email: req.body.email, password: req.body.password }).then(data => {
          if (data) {
            res.json({ result: true });
          } else {
            res.json({ result: false, error: 'User not found' });
          }
        });
       });





module.exports = router;