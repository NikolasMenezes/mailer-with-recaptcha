require('dotenv').config();
const express = require('express');
const mailer = require('nodemailer');

const app = express();

app.use(express.json());
// app.use(express.cors());

const buildHtmlMessage = require('./message.js')

const transporter = mailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_SENDER_PASS,
  },
});

app.post('/email', (req, res) => {
  const { subject } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: "nikolasmezes23@gmail.com",
    subject: subject,
    html: buildHtmlMessage(req.body),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send('Email sent: ' + info.response);
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server is running on port ', PORT);
});