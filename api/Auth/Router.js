const express = require('express');
const passport = require('passport');
const router = express.Router();

// register with passport.js //
router.post('/auth/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/auth/signup',
    failureFlash: true
}));

// login with passport.js and local strategy //
router.post('/auth/signin', passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/auth/signin',
    failureFlash: true
}));

// register / login with passport.js and google strategy //
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile'],
}));

router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/auth/google',
    failureFlash: true
}));

// register / login with passport.js and facebook strategy //
router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['profile'],
}));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/auth/facebook',
    failureFlash: true
}));

// get profille //
router.get('/profile', (req, res, next) => {
    res.send('you are connected');
});


module.exports = router;