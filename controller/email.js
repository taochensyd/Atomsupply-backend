const shell = require("shelljs");
const nodemailer = require("nodemailer");



async function sendWaitingForUpdateEmail(message) {
    try {
      let date_ob = new Date();
  
      // adjust 0 before single digit date
      let date = ("0" + date_ob.getDate()).slice(-2);
  
      // current month
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  
      // current year
      let year = date_ob.getFullYear();
  
      // current hours
      let hours = date_ob.getHours();
  
      // current minutes
      let minutes = date_ob.getMinutes();
  
      // current seconds
      let seconds = date_ob.getSeconds();
      let testAccount = await nodemailer.createTestAccount();
  
      let transporter = nodemailer.createTransport({
        host: "172.20.0.50", // webmail.atom.com.au
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EmailUsername || "noreply",
          pass: process.env.EmailPassword || "3xszmw2dfjpOSMKRYiZs",
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
  
      // send mail with defined transport object
      let info = await transporter.sendMail({
        //   from: '"Kube-Alert" <kube-alerts@atom.com.au>',
        // to: "InformationTechnology@atom.com.au",
        from: '"Kube-Alert" <noreply@atom.com.au>',
        // to: "kube-alerts@atom.com.au",
        to: "kube-alerts@atom.com.au",
        subject: `Waiting for update: ${message.image.replace("_", "-")}-${message.tag}`,
        text: `Date & Time: ${date}/${month}/${year} ${hours}:${minutes}:${seconds} (${Intl.DateTimeFormat().resolvedOptions().timeZone
          })\nApplication: Microk8s Kubernetes Cluster\nWaiting for update: \nEnvironemnt: ${message.environment
          }\nImage: ${message.image}\nTag: ${message.tag
          }\n\nClick below link to update:\nhttps://kube-api-endpoint.atom.com.au/update/${message.image.replace("_", "-")}/${message.tag}`,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }


  module.exports = {
    sendWaitingForUpdateEmail
};