const { Router, application } = require('express');
const router = Router();
const mysql = require('mysql2');
const connection = require('../database');
const alertEmail = require('./email')
const shell = require("shelljs");
const writeLogController = require("./writeLogController");
const tagPosition = ["master", "staging", "develop", "releasing"];
const apiToken = ["2sGMxTwKeClnILXa3aK2", "testToken1"];

function updatePOST(req, res) {
    let currentTimeStamp = shell.exec("date");
    let tempOutputObj = {
        Date: currentTimeStamp,
        message: ""
    }
    if (apiToken.includes(req.body.token) === false) {
        res.status(401).send("Invalid token!");

    }
    else if (req.body.tag === "staging") {
        if (alertEmail.sendWaitingForUpdateEmail(req.body)) {
            tempOutputObj.message = "Waiting for approval email sent";
            let postbackData = JSON.stringify(tempOutputObj)
            res.status(200).send(`${postbackData}`);
        } else {
            tempOutputObj.message = "Fail to sent waiting for approval email";
            let postbackData = JSON.stringify(tempOutputObj)
            res.status(400).send(`${postbackData}`);
        }
    }

    else {
        let tagIndex = { index: null };
        let output = "";
        let source = "";
        if (req.body.token === apiToken[0]) {
            source = "Bekker"
        } else if (req.body.token === apiToken[1]) {
            source = "Postman Testing"
        }
        if (tagPosition.includes(req.body.tag.toLowerCase())) {
            output = shell.exec(`microk8s kubectl rollout restart deployment ${req.body.image.replace("_", "-").toLowerCase()}-${req.body.tag.slice(0,3).toLowerCase()}`);
            tempOutputObj.message = output;
            console.log(output.stderr);
            if (output.stderr.includes("not found")) {
                let logType = "KubeUpdateErrorLogs";
                console.log("first else)")
                console.log(logType)
                writeLogController.writeLog(logType.replace(/['"]+/g, ''), currentTimeStamp.replace(/['"]+/g, ''), req.body.tag.replace(/['"]+/g, ''), req.body.image.replace(/['"]+/g, ''), req.body.tag.replace(/['"]+/g, ''), output.stderr.replace(/['"]+/g, ''), source.replace(/['"]+/g, ''));
                output = "Deployment Not Found";
                console.log(output)
                tempOutputObj.message = output;
                let postbackData = JSON.stringify(tempOutputObj);
                res.status(404).send(`${postbackData}`);
            } else {
                let logType = "KubeUpdateLogs";
                writeLogController.writeLog(logType, currentTimeStamp, req.body.environment, req.body.image, req.body.tag, output, source);
                let postbackData = JSON.stringify(tempOutputObj)
                res.status(200).send(`${postbackData}`);
            }


        } else {
            //Not Found
            // .replace(/['"]+/g, '')   is removing ' " quotes
            console.log("in last else)")
            let logType = "KubeUpdateErrorLogs";
            writeLogController.writeLog(logType.replace(/['"]+/g, ''), currentTimeStamp.replace(/['"]+/g, ''), req.body.tag.replace(/['"]+/g, ''), req.body.image.replace(/['"]+/g, ''), req.body.tag.replace(/['"]+/g, ''), output.stderr.replace(/['"]+/g, ''), source.replace(/['"]+/g, ''));
            output = "Deployment Not Found";
            tempOutputObj.message = output;
            let postbackData = JSON.stringify(tempOutputObj);
            res.status(404).send(`${postbackData}`);
        }
    }
}

module.exports = {
    updatePOST
};