const { Router, application } = require('express');
const router = Router();
const connection  = require('../database.js');

router.get('/', (req, res) => {
    try {
        let sql = `SELECT * FROM KubeUpdateLogs;`
        connection .query(sql, (err, rows) => {
            console.log(rows);
            res.send(rows);
        });
    } catch (error) {
        console.log(error);
    }
    
    res.status(404);
})

router.post('/', (req, res) => {
    try {
        let sql = `SELECT * FROM KubeUpdateLogs;`
        connection.query(sql, (err, rows) => {
            console.log(rows);
            res.send(rows);
        });
    } catch (error) {
        console.log(error);
    }
    
    res.status(404);
})



module.exports = router;