const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports  = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: "yousecret"
};