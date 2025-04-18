const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 8087;

// Use body-parser middleware to parse JSON data
app.use(bodyParser.json());

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
  const { to, subject, body } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.mail.mn',
    port: 587,
    secure: false,
    auth: {
      user: 'sales@kacc.mn',
      pass: '94269002',
    },
  });

  const mailOptions = {
    from: 'sales@kacc.mn',
    to: "zayalhagva6@gmail.com",
    subject,
    text: "body",
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
