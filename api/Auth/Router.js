const express = require('express')
const router = express.Router();

const userCtrl = require('./AuthService');

router.post('/sigup', userCtrl.sigup);

module.exports = router;