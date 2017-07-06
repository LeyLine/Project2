const express = require('express');
const EventModel = require('../models/event-model.js');
const router = express.Router();











router.get('/events', (req, res, next) => {
    if (req.user) {
      res.render('event-views/new-event-view.ejs');
    }

    else {
      res.redirect('/login');
    }
});








router.post('/events', (req, res, next) => {
    const theEvent = new EventModel({


      name:           req.body.eventName,

      owner:          req.user._id,

      description:
                    { photoUrl: req.body.eventPhotoUrl,

                      details: req.body.eventDescription
                    },
      location:
                    { photoUrl: req.body.LPhotoUrl,

                      city: req.body.eventCity,

                      address: req.body.eventAddress,
                    },

      });


    theEvent.save((err) => {
          if (err) {
            next(err);
            return;
          }

          res.redirect('/my-events');
      });


});












router.get('/my-events', (req, res, next) => {
    if (req.user === undefined) {
      res.redirect('/login');
      return;
    }

    EventModel.find(

      { owner: req.user._id },

      (err, eventResults) => {
          if (err) {
            next(err);
            return;
          }
          console.log("Im here!" + eventResults);
          res.locals.eventsAndStuff = eventResults;

          const ownerId = eventResults[0].owner;
          //Require User model
          //Find user by ID
          //Save user as local variable



          res.render('event-views/event-list-view.ejs');
      }
    );
});








module.exports = router;
