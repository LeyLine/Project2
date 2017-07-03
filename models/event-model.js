const mongoose = require('mongoose');
const Schema = mongoose.Schema;









const myEventSchema = new Schema(
  {

    name:        { type: String
                 },

    description: { photoUrl: { type: String },
                   details: { type: String },
                 },

    location:    { city: { type: String },
                   street: { type: String }
                 },
// the id of the user who owns the room
    owner:       { type: String
                 },
  },
     {
       timestamps: true
     });







const EventModel = mongoose.model('Event', myEventSchema);






module.exports = EventModel;
