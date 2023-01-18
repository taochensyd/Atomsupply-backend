const mysql = require('mysql2');
const connection = require('../database');

function getAllLogs(logType) {

    if (logType === "KubeUpdateLogs") {
        try {
            let sql = `SELECT * FROM KubeUpdateLogs`;
            connection.query(sql, (error, rows) => {
                if (!error && rows.length > 0) {
                    console.log("Get * from KubeUpdateLogs")
                    return rows;
                }

            });
        } catch (error) {
            console.log(error);
            return false;
        }

    } else if (logType === "KubeUpdateErrorLogs") {
        try {
            let sql = `SELECT * FROM KubeUpdateErrorLogs`;
            connection.query(sql, (error, rows) => {
                if (!error && rows.length > 0) {
                    console.log("Get * from KubeUpdateLogs")
                    return rows;
                }

            });
        } catch (error) {
            consolelog(error);
            return false;
        }

    } else {
        return false;
    }
}

module.exports = {

};