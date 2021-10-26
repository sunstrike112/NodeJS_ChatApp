import passport from "passport";
import passportFacebook from "passport-facebook";
import UserModel from "../../models/userModel";
import { transSuccess, transErrors } from "../../../lang/vi";

let FacebookStratery = passportFacebook.Strategy;

let fbAppId = process.env.FB_APP_ID;
let fbAppSecret = process.env.FB_APP_SECRET;
let fbCallbackUrl = process.env.FB_CALLBACK_URL;

/**
 * Valid user account type: Facebook
 */
let initPassportFacebook = () => {
  passport.use(
    new FacebookStratery(
      {
        clientID: fbAppId,
        clientSecret: fbAppSecret,
        callbackURL: fbCallbackUrl,
        passReqToCallback: true,
        passwordField: ["email", "gender", "displayname"],
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          let user = await UserModel.findByFacebookUid(profile.id);
          if (user) {
            return done(null, user, req.flash("success", transSuccess.loginSuccess(user.username)));
          }

          console.log(profile);
          let newUserItem = {
            username: profile.displayName,
            gender: profile.gender,
            local: { isActive: true },
            facebook: {
              uid: profile.id,
              token: accessToken,
              email: profile.emails[0].value,
            },
          };
          let newUser = await UserModel.createNew(newUserItem);
          return done(null, newUser, req.flash("success", transSuccess.loginSuccess(newUser.username)));
        } catch (error) {
          console.log(error);
          return done(null, false, req.flash("error"), transErrors.server_error);
        }
      }
    )
  );

  // Save user ID to session
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  // This is called by passport.session()
  // return userInfo to req.user
  passport.deserializeUser((id, done) => {
    UserModel.findUserById(id)
      .then((user) => {
        return done(null, user);
      })
      .catch((error) => {
        return done(error, null);
      });
  });
};

module.exports = initPassportFacebook;
