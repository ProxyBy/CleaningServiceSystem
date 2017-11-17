const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/bdConfig');

module.exports = function(passport){
    console.log("00");
    let opts = {};
  //  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    console.log("01");
    opts.secretOrKey = config.secret;
    console.log("02");
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log("0");
        User.findOne({id: jwt_payload.sub}, (err, user) => {
            if(err){
                console.log("1");
                return done(err, false);
            }
            if(user){
                console.log("2");
                return done(null, user);
            } else {
                console.log("3");
                return done(null, false);
            }
        });
    }));
};


