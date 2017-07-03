const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const myUserSchema = new Schema({ // 1st argument -> structure object
  fullName: {
    type: String
  },

  // SIGN UP/LOG IN FORM users -------
  username: {
    type: String
  },
  encryptedPassword: {
    type: String
  },

});


const UserModel = mongoose.model('User', myUserSchema);
//   |
// 'User' -> 'users' -> db.users.find()

module.exports = UserModel;
