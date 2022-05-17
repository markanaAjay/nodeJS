const router = require('express').Router();
const controllers = require('./lib/controllers');

router.post('/isEmailReceived', controllers.checkEmail); // This is for an example

module.exports = router;
