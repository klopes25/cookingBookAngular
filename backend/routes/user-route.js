const express = require('express');
const app = express();
const userRoute = express.Router();

// User model
let User = require('../models/user');

// Get all users
userRoute.route('/').get((req, res, next) => {
  User.find((error, data) => {
      if (error) return next(error);
      else res.json(data);
  })
})

// Get one user
userRoute.route('/:login/:password').get((req, res, next) => {
  User.findOne({ login: req.params.login, password: req.params.password }, (error, data) => {
      if (error) return next(error);
      else res.json(data);
  })
})

// Create User
userRoute.route('/').post((req, res, next) => {
  const user = new User(); // use User schema
  // get data to create user from req.body
  user._id = `@${req.body.login}`;
  user.login = req.body.login;
  user.password = req.body.password;
  user.email = req.body.email;
  user.logo = req.body.logo;
  // save it
  user.save()
    .then(() => res.json(user))
    .catch(err => next(err));
});

// Update User
userRoute.route('/:login').put(async (req, res, next) => {
  // get the recipe
  let user = await User.findOne({ login: req.params.login }).exec(); // because id = @ + login
  // get the new values for user
  let newUser = req.body;
  // update values
  for (const key in newUser) {
    user[key] = newUser[key];
  }
  // save
  await user.save();
  // send the new value
  res.json(user);
})

// Delete User
userRoute.route('/:id').delete((req, res, next) => {
    console.log("Try do delete it ! ", req.params.id)
    User.findOneAndRemove({ _id: req.params.id }, (error, data) => {
        if (error) return next(error);
        else res.status(200).json({ msg: data });
    })
})
module.exports = userRoute;