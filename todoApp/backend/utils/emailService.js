const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.example.com',
      port: 587,
      secure: false,
      auth: {
        user: 'your-email@example.com',
        pass: 'your-email-password',
      },
    });
  }

  async sendVerificationEmail(email, verificationCode) {
    const mailOptions = {
      from: 'no-reply@example.com',
      to: email,
      subject: 'Email Verification',
      text: `Your verification code is: ${verificationCode}`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return { success: true, message: 'Verification email sent' };
    } catch (error) {
      return { success: false, message: 'Failed to send verification email', error };
    }
  }
}

module.exports = new EmailService();
