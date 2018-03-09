var Jwtstrategy=require('passport-jwt').Strategy;
var ExtractJwt=require('passport-jwt').ExtractJwt;
var user=require('../models/user');
var config=require('../config/database');

module.exports=function(passport){
    let opts={};
    opts.jwtfromrequest=ExtractJwt.fromAuthHeader();
    opts.secretOrKey=config.secret;
    passport.use(new Jwtstrategy(opts, (jwt_payload, done)=>{
        user.getUserById(jwt_payload._doc._id,(err,user)=>{
            if(err){
                return done(err,false);
            }
            if(user){
                return done(null,user);
            }else{
                return done(null,false);
            }
        });
    }));
}