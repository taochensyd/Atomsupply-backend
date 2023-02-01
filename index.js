const express = require("express");
const app = express();
const shell = require("shelljs");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");

require("dotenv").config();


const BekkerToken = "2sGMxTwKeClnILXa3aK2";

// Import Routes from routes folder
const updateRoute = require('./routes/update');
const emailUpdateRoute = require('./routes/emailUpdate');
const logRoute = require('./routes/log');
const errorLogRoute = require('./routes/errorLogs');
const sendApprovalEmail = require('./routes/approvalEmail');


app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "build")));
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    // res.sendFile("views/index.html", { root: __dirname });
    // // res.sendFile("../AtomSupply-KubeFrontend/build/index.html", { root: __dirname });
    // res.sendFile(path.resolve(__dirname, '../AtomSupply-KubeFrontend/build/', 'index.html'));
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });

app.use('/update', updateRoute);
app.use('/api/v1/update', emailUpdateRoute);
app.use('/api/v1/log', logRoute);
app.use('/api/v1/errorLog', errorLogRoute);
app.use('/api/v1/sendApprovalEmail', sendApprovalEmail);








const port = process.env.PORT || 3500;

app.listen(port, console.log(`Server is listening on port ${port}`));