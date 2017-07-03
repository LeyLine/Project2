const express = require('express');
const EventModel = require('../models/event-model.js');
const router = express.Router();











router.get('/events/new', (req, res, next) => {
    if (req.user) {
      res.render('event-views/new-event-view.ejs');
    }

    else {
      res.redirect('/login');
    }
});








router.post('/events', (req, res, next) => {
    const theEvent = new EventModel({
      name: req.body.eventName,
      description: req.body.eventDescription,  //what i need help with
      location: req.body.eventLocation,
      ownerName: req.user.username,
    });


});












router.get('/my-events', (req, res, next) => {
    if (req.user === undefined) {
      res.redirect('/login');
      return;
    }

    EventModel.find(
        // find the rooms owned by the logged in user
      { owner: req.user._id },

      (err, eventResults) => {
          if (err) {
            next(err);
            return;
          }

          res.locals.eventsAndStuff = eventResults;

          res.render('event-views/event-list-view.ejs');
      }
    );
});








module.exports = router;
