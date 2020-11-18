const router = require('express').Router();
const {modifyProfile} = require('./ProfileService');

// route for modify profile
router.put('/modify', modifyProfile);

module.exports = router;