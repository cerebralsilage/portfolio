const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static('Public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Public/pages/contact.html')
});

app.post('/', (req, res) => {
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mikesportfoliocontact@gmail.com',
      pass: `${process.env.Pass}`
    }
  })
  const mailOptions = {
    from: req.body.email,
    to: 'mikesportfoliocontact@gmail.com',
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text: req.body.message
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('error');
    } else  {
      console.log('Email sent: ' + info.response);
      res.send('success');
    }
  })
});

app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
});