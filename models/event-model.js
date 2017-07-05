const mongoose = require('mongoose');
const Schema = mongoose.Schema;









const myEventSchema = new Schema(
  {

    name:        { type: String
                 },

    description: { photoUrl: { type: String },
                   details: { type: String },
                 },

    location:    { photoUrl: { type: String },
                   city: { type: String },
                   address: { type: String }
                 },
// the id of the user who owns the room
    owner:       { type: Schema.Types.ObjectId
                 },
  },
     {
       timestamps: true
     });







const EventModel = mongoose.model('Event', myEventSchema);






module.exports = EventModel;
