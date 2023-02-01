const { Router, application } = require('express');
const router = Router();
const shell = require("shelljs");
const nodemailer = require("nodemailer");
const writeLogController = require("../controller/writeLogController");
const tagPosition = ["master", "staging", "develop"];
const updateController = require('../controller/emailUpdate');
const apiToken = ["2sGMxTwKeClnILXa3aK2", "testToken1"];


router.get('/deploymentName', (req, res) => {
    updateController.emailUpdate(req, res);
})


module.exports = router;