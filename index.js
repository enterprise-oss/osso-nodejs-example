// index.js

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

/*  EXPRESS */
const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const session = require('express-session');
app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
}));

app.use(express.urlencoded({
  extended: true
}))

app.listen(port , () => console.log('App listening on port ' + port));

/*  Passport Setup  */
const passport = require('passport');
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

/*  Osso Setup  */
 
const OssoStrategy = require('passport-osso').Strategy;
passport.use(new OssoStrategy({
  baseUrl: process.env.OSSO_BASE_URL,
  callbackURL: "http://localhost:3000/auth/osso/callback",
  clientID: process.env.OSSO_CLIENT_ID,
  clientSecret: process.env.OSSO_CLIENT_SECRET,
},
  function(_req, _accessToken, _expiresIn, profile, done) {
    userProfile=profile;
    return done(null, userProfile);
  }
));

// Routes

app.get('/', function(req, res) {
  res.render('pages/auth');
});

app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

app.post('/auth/osso', (req, res, next) => {
  const { email } = req.body;
  const authenticator = passport.authenticate('osso', { email })
  authenticator(req, res, next)
})
app.get('/auth/osso/callback', 
  passport.authenticate('osso', { failureRedirect: '/error' }),
  function(_req, res) {
    res.redirect('/success');
  }
);