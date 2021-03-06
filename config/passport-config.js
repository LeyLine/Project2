// We are configuring Passport in a separate file
// to avoid making a mess in "app.js".

const passport = require('passport');
const bcrypt = require('bcrypt');


const UserModel = require('../models/user-model.js');


// serializeUser   (controls what goes inside the bowl)
//   - saves only the user's database ID in the bowl
//   - happens ONLY when you log in
passport.serializeUser((userFromDb, next) => {
  next(null, userFromDb._id);
  //  |
  // null in 1st argument means NO ERROR 👍🏽
});


// deserializeUser (controls what you get when you check the bowl)
//   - uses the ID in the bowl to retrieve the user's information
//   - happens every time you visit any page on the site after logging in
passport.deserializeUser((idFromBowl, next) => {
  UserModel.findById(
    idFromBowl,

    (err, userFromDb) => {
      if (err) {
        next(err);
        return;
      }

      // Tell passport that we got the user's info from the DB
      next(null, userFromDb);
      //  |
      // null in 1st argument means NO ERROR 👍🏽
    }
  );
});


// STRATEGIES ⇓⇓⇓ -------------------------------------------------------------
//     the different ways we can log into our app

// passport-local (log in with username and password from a form)
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({ // 1st argument -> settings object
    usernameField: 'loginUsername',

    passwordField: 'loginPassword'
  }, //                   |
  // <input name="loginPassword">
  //                   |
  (formUsername, formPassword, next) => { // 2nd argument -> callback
    // (will be called when a user tries to login)
    // #1 Is there an account with the provided username?
    // (is there a user with that username in the database?)
    UserModel.findOne({
        username: formUsername
      },

      (err, userFromDb) => {
        if (err) {
          next(err);
          //  |
          // error in 1st argument means something unforeseen happened 😫
          return;
        }

        // If the username doesn't exist, the "userFromDb" variable will be empty.

        // Check if "userFromDb" is empty
        if (userFromDb === null) {
          // In Passport, if you call next() with "false" in 2nd position,
          // that means LOGIN FAILED.
          next(null, false);
          return;
        }

        // #2 If there is a user with that username, is the PASSWORD correct?
        if (bcrypt.compareSync(formPassword, userFromDb.encryptedPassword) === false) {
          // In Passport, if you call next() with "false" in 2nd position,
          // that means LOGIN FAILED.
          next(null, false);
          return;
        }

        // If we pass those if statements, LOGIN SUCCESS!
        // (passport will now save stuff "userFromDb" in the bowl)
        next(null, userFromDb);
        // In Passport, if you call next() with a user in 2nd position,
        // that means LOGIN SUCCESS.
      }
    );
  }
));
