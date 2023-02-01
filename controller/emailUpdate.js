const { Router, application } = require('express');
const router = Router();
const mysql = require('mysql2');
const connection = require('../database');
const shell = require("shelljs");
const writeLogController = require("./writeLogController");
const tagName = ["master", "staging", "develop", "releasing"];
const apiToken = ["2sGMxTwKeClnILXa3aK2", "testToken1"];

function emailUpdate(req, res) {
    let currentTimeStamp = shell.exec("date");
    let tempOutputObj = {
        Date: currentTimeStamp,
        message: ""
    }
    let output = "";
    let source = "Email Link";
    if (tagName.includes(req.params['tag'])) {
        output = shell.exec(`microk8s kubectl rollout restart deployment ${req.params['image'].replace("_", "-")}-${req.params['tag'].slice(0, 3)}`);
        tempOutputObj.message = output;
        if (output.stderr.includes("not found")) {
            let logType = "KubeUpdateErrorLogs";
            writeLogController.writeLog(logType.replace(/['"]+/g, ''), currentTimeStamp.replace(/['"]+/g, ''), req.params['tag'].replace(/['"]+/g, ''), req.params['image'].replace(/['"]+/g, ''), req.params['tag'].replace(/['"]+/g, ''), output.stderr.replace(/['"]+/g, ''), source.replace(/['"]+/g, ''));
            output = "Deployment Not Found";
            tempOutputObj.message = output;
            let postbackData = JSON.stringify(tempOutputObj);
            res.status(404).send(`${postbackData}`);
        } else {
            let logType = "KubeUpdateLogs";
            writeLogController.writeLog(logType, currentTimeStamp, req.params['tag'], req.params['image'], req.params['tag'], output, source);
            let postbackData = JSON.stringify(tempOutputObj)
            res.status(200).send(`${postbackData}`);
        }
    }
}

    module.exports = {
        emailUpdate
    };