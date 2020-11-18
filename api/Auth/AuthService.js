const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

const bcrypt = require('bcryptjs');
const Users = require('../../models/Users');
const moment = require('moment');

// id an secret api of google and facebook //
/*
const key = {
    google: {
        GOOGLE_APP_ID: "##",
        GOOGLE_APP_SECRET: "##",
    },
    facebook: {
        FACEBOOK_APP_ID: "##",
        FACEBOOK_APP_SECRET: "##",
    },
}
*/




// serialize User with passport //
passport.serializeUser((user, done) => {
    // serialize by user id //
    done(null, user.id);
});

// deserialize User with passport
passport.deserializeUser((userId, done) => {
    // deserialize user //
    User.findById(userId, (err, user) => {
        done(err, user);
    });
});


// local signup strategy //
passport.use('local_signup', new LocalStrategy({
    usernameFiled: 'email',
    passwordFiled: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    console.log('-------------------------------');
    // search user in database //
    Users.findOne({
        'email': email
    }, (err, user) => {
        if (err) {
            return done(err);
        } else if (user) {
            // use find //
            return done(null, false, {
                message: 'email is already in use.'
            });
        } else if (password != req.body.repassword) {
            // user not find //
            return done(null, false, {
                message: "repassword does not match"
            });
        } else {
            // password hash
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return done(err);
                };
                // take now date //
                let dateInscription = moment().format("dddd MM MMMM YYYY");
                const User = new Users({
                    username: req.body.username,
                    email: req.body.email,
                    country: req.body.country,
                    skills: skill,
                    password: hash,
                    typeUser: req.body.typeUser,
                    created_at: dateInscription,
                    updated_at: dateInscription,
                });
                console.log("execu");

                // validation of user
                User.validate((err) => {
                    if (err) {
                        return done(err);
                    };
                    // saving user
                    User.save((err, result) => {
                        if (err) {
                            return done(err);
                        };
                        return done(null, User, {
                            message: 'user created'
                        });

                    });
                });
            });
        };
    });
}));


// local signin strategy //
passport.use('local_signin', new LocalStrategy({
    usernameFiled: 'email',
    passwordFiled: 'password',
    passReqToCallback: true
}, (email, password, done) => {
    // search user in database //
    Users.findOne({
        'email': email
    }, (err, user) => {
        if (err) {
            return done(err);
        } else if (!user) {
            // use not find //
            return done(null, false, {
                message: 'user not find'
            });
        } else if (!bcrypt.compare(password, user.password)) {
            // use password is incorrect //
            return done(null, false, {
                message: 'wrong password'
            });
        } else {
            done(null, user, {
                // use find and is valid //
                message: "user find"
            });
        };
    });
}));

// forgot controler
exports.forgotPassword = (req, res, next) => {
    let now = moment().format("dddd MM MMMM YYYY");
    // hashing new password
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            Users.findOneAndUpdate(
                {email: req.body.email},
                {
                    $set: {
                        password: hash,
                        updated_at: now,
                    }
                }
            ).then(() => res.status(201).json({message: "password modify"}))
            .catch(err => res.status(200).json({erro}));
        })
        .catch(error => res.statue(500).json({error}));
};


/*
************************************************************************************************
this code on coment can't execut becaused the id and secret of google and facebook api is mising
************************************************************************************************

// facebook strategy //
passport.use(new FacebookStrategy({
    clientID: key.facebook.FACEBOOK_APP_ID,
    clientSecret: key.facebook.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
    // search user in database //
    Users.findOne({
        providerId: profile.id
    }, (err, user) => {
        if (err) {
            return done(err);
        } else if (user) {
            // use find //
            return done(null, user, {
                message: 'user find'
            });
        } else {
            // use not find //
            let dateInscription = moment().format("dddd MM MMMM YYYY");
            const User = new Users({
                providerId: profile.id,
                username: profile.username,
                created_at: dateInscription,
                updated_at: dateInscription,
            });

            // validation of user
            User.validate((err) => {
                if (err) {
                    return done(err);
                };
                // saving user
                User.save((err, result) => {
                    if (err) {
                        return done(err);
                    };
                    return done(null, User, {
                        message: 'user created'
                    });
                });
            });
        };
    });
}));


// google strategy //
passport.use(new GoogleStrategy({
    clientID: key.google.GOOGLE_APP_ID,
    clientSecret: key.google.GOOGLE_APP_SECRET,
    callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    // search user in database //
    Users.findOne({
        providerId: profile.id
    }, (err, user) => {
        if (err) {
            return done(err);
        } else if (user) {
            // use find //
            return done(null, user, {
                message: 'user find'
            });
        } else {
            // use not find //
            let dateInscription = moment().format("dddd MM MMMM YYYY");
            const User = new Users({
                providerId: profile.id,
                username: profile.displayName,
                created_at: dateInscription,
                updated_at: dateInscription,
            });

            // validation of user
            User.validate((err) => {
                if (err) {
                    return done(err);
                };
                // saving user
                User.save((err, result) => {
                    if (err) {
                        return done(err);
                    };
                    return done(null, User, {
                        message: 'user created'
                    });
                });
            });
        };
    });
}));

************************************************************************************************
*/