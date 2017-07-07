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

          res.redirect('/my-event');
      });


});












router.get('/my-events', (req, res, next) => {
  console.log('got here');
    if (req.user === undefined) {
      res.redirect('/');
      return;
    }

    EventModel.find(

      { owner: req.user._id },

      (err, eventResults) => {
          if (err) {
            next(err);
            return;
          }
          res.locals.eventsAndStuff = eventResults;


          // console.log("Im here" + eventsAndStuff[0].description.photoUrl);


          res.render('event-views/event-list-view.ejs');
      }
    );
});








module.exports = router;
