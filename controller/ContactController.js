const nodemailer = require('nodemailer');

exports.submitContactForm = (req, res) => {
  const { fullName, email, message } = req.body;

  // Validate form fields
  if (!fullName || !email || !message) {
    return res.status(400).send('Please fill in all required fields.');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'anandraj93054@gmail.com', // Use environment variables
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'anandraj93054@gmail.com',
    to: email, // Update recipient email
    subject: 'New Contact Form Submission',
    text: `Name: ${fullName}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending message. Please try again later.');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Message sent successfully!');
    }
  });
};
