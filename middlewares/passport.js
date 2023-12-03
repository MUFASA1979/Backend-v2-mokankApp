const bcrypt = require("bcrypt");
const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const {fromAuthHeaderAsBearerToken} = require ("passport-jwt").ExtractJwt;
require ("dotenv").config();



const localStrategy = new LocalStrategy(
    {usernameField: "username"},
    async(username, password, done) => {
        try {
            const user = await User.findOne({username});
            if (!user) return done("Username or Password is Wrong");
            const checkPassword = await bcrypt.compare(password, user.password);
            if (!checkPassword) return done("Username or Password is Wrong");
            return done (null, user);
        } catch (error) {
            next(error)
        }
    }
);


const jwtStrategy = new JwtStrategy(
    {
        jwtFromRequest: fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_PRIVATE_KEY,
    },
    async (payload, done) => {
        try {
            if (Date.now()/1000 > payload.exp){
                done({message:"Token is Expired"})
            }
            const user = await User.findById(payload._id);
            if (!user) return done(null,false);
            return done (null, user);
        } catch (error) {
            next(error)
        }
    }

);

module.exports = {localStrategy, jwtStrategy}