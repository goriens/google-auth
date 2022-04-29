const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");
const { v4: uuidv4 } = require("uuid");
const User = require('../models/users.models');
require("dotenv").config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
},

    async function (accessToken, refreshToken, profile, cb) {
        //console.log(profile._json.email);
        //console.log(uuidv4());

        ///passport -- suhaib@123
        //role
        let user = await User.findOne({ email: profile?._json?.email }).lean().exec();
        if (!user) {
            user = await User.create({
                email: profile._json.email,
                password: uuidv4(), //random string !=
                role: ["admin"],
            });
        }
        //console.log(user);
        return cb(null, user);
    }
));
module.exports = passport;