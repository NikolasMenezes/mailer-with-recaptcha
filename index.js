require('dotenv').config();
const express = require('express');
const cors = require('cors')
const mailer = require('nodemailer');

const app = express();

app.use(express.json());
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));

const buildHtmlMessage = require('./message.js')

const Recaptcha = require('express-recaptcha').RecaptchaV2

const recaptcha = new Recaptcha(process.env.RECAPTCHA_SITE_KEY, process.env.RECAPTCHA_SECRET_KEY)

const transporter = mailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_SENDER_PASS,
  },
});

app.post('/email', recaptcha.middleware.verify, (req, res) => {
  if (req.recaptcha.error) {
    return res.status(401).json({ message: 'Recaptcha validation failed' });
  }

  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: "nikolasmezes23@gmail.com",
    subject: "Contato pelo site",
    html: buildHtmlMessage(req.body),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(200).json({ success: true, 'message': info.response });
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server is running on port ', PORT);
});