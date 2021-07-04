
const express = import('express');
const logger = require('../middleware/logger.js');
const error = require('../middleware/error.js');
const home = require('../routes/home.js');
const users = require('../routes/users.js');
const emailVerifier = require('../routes/emailVerification.js');
const auth = require('../routes/auth.js');
const account = require('../routes/account.js');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/home', home);
    app.use('/api/users', users);
    app.use('/api/email-verifier/', emailVerifier);
    app.use('/api/auth', auth);
    app.use('/api/account', account);
    app.use(error);
}