const { Router, application } = require('express');
const router = Router();
const shell = require("shelljs");
const nodemailer = require("nodemailer");
const writeLogController = require("../controller/writeLogController");
const tagPosition = ["master", "staging", "develop"];
const updateController = require('../controller/updateController');
const apiToken = ["2sGMxTwKeClnILXa3aK2", "testToken1"];


router.get('/', (req, res) => {
    res.send({ "message": "OK" })
})

router.post('/', (req, res) => {
    updateController.updatePOST(req, res);
})


module.exports = router;