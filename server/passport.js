const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const User = require('./models')
const { GOOGLE_CLIENT_ID, GOOGLE_SECRET, GOOGLE_CALLBACK } = require('./config')

passport.use(new GoogleStrategy(
    {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_SECRET,
        callbackURL: GOOGLE_CALLBACK
    },
    async function(accessToken, refreshToken, profile, cb) {
        try {
            let user = await User.findOne({ googleId: profile.id })
            if (user) return cb(null, user);
            user = await User.create({
                name: profile.displayName,
                googleId: profile.id,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value
            })
            return cb(null, user)
        } catch (e) {
            return cb(e)
        }
    }
))

passport.serializeUser(function(user, cb) {
    cb(null, user._id)
})

passport.deserializeUser(async function(userId, cb) {
    cb(null, await User.findById(userId))
})