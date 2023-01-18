const { Router, application } = require('express');
const router = Router();
const shell = require("shelljs");
const nodemailer = require("nodemailer");

router.post("/api/v1/sendApprovalEmail", (req, res) => {
    if (sendEmailToUpdate(req.body)) {
        res.status(200).send("Email Sent");
    } else {
        res.status(400).send("Fail to sent email");
    }
});




module.exports = router;