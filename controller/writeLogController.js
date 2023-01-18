const mysql = require('mysql2');
const connection = require('../database');

function writeLog(logType, currentTimeStamp, environment, image, tag, output, source) {
    
    if (logType === "KubeUpdateLogs") {
        try {
            let sql = `INSERT INTO KubeUpdateLogs (UpdateTimeStamp, EnvironmentName, ImageName, TagName, ConsoleMessage, Source) VALUES ("${currentTimeStamp}", "${environment}", "${image}", "${tag}", "${output}", "${source}")`
            // let sql = 'INSERT INTO KubeUpdateLogs (UpdateTimeStamp, EnvironmentName, ImageName, TagName, ConsoleMessage, Source) VALUES (?,?,?,?,?,?)'
            // let sql = 'INSERT INTO KubeUpdateLogs (UpdateTimeStamp, EnvironmentName, ImageName, TagName, ConsoleMessage, Source) VALUES (?,?,?,?,?,?)', [currentTimeStamp, environment, image, tag, output, source]
            connection.query(sql, (error, rows) => {
                if (!error && rows.length > 0) {
                    console.log("KubeUpdateLogs")
                    return true;
                }

            });
        } catch (error) {
            console.log(error);
            return false;
        }
    } else if (logType === "KubeUpdateErrorLogs") {
        try {
            let sql = `INSERT INTO KubeUpdateErrorLogs (ErrorTimeStamp, EnvironmentName, ImageName, TagName, ConsoleMessage, Source) VALUES ("${currentTimeStamp}", "${environment}", "${image}", "${tag}", "${output}", "${source}")`
            // let sql = 'INSERT INTO KubeUpdateLogs (UpdateTimeStamp, EnvironmentName, ImageName, TagName, ConsoleMessage, Source) VALUES (?,?,?,?,?,?)'
            // let sql = 'INSERT INTO KubeUpdateLogs (UpdateTimeStamp, EnvironmentName, ImageName, TagName, ConsoleMessage, Source) VALUES (?,?,?,?,?,?)', [currentTimeStamp, environment, image, tag, output, source]
            connection.query(sql, (error, rows) => {
                if(error) {
                    console.log(error)
                }
                if (!error && rows.length > 0) {
                    console.log("KubeUpdateLogs")
                    return true;
                }

            });
        } catch (error) {
            console.log(error);
            return false;
        }
    } else {
        return false;
    }
    
}

module.exports = {
    writeLog
};