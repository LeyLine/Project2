const express = require('express');
const bcrypt = require('bcrypt');
const EventModel = require('../models/event-model.js');

const UserModel = require('../models/user-model.js');


const router = express.Router();


router.get('/dashboard', (req, res, next) => {
  EventModel.find(
    (err, eventResults) => {
        if (err) {
          next(err);
          return;
        }
        if (req.user) {
          console.log('')
          console.log('LOGGED IN 🐳🐳🐳🐳🐳🐳🐳🐳🐳 ----------------------')
          console.log('')
          res.locals.eventsAndStuff = eventResults;
          res.render('dash-view/dashboard-view.ejs');
          return;
        }

        console.log('')
        console.log('GETT OUTTA HERE 🐳🐳🐳🐳🐳🐳🐳🐳🐳 ----------------------')
        console.log('')

      res.redirect('/');

    });
});









module.exports = router;
