import nodemailer from 'nodemailer';

// Create the transporter using your Gmail credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,  
      pass: process.env.EMAIL_PASSWORD 
    }
  });
  
// Function to send an email
export const sendPackageArrivalEmail = async (toEmail, packageInfo) => {
  const mailOptions = {
    from: "noreply@parcel-monitor.com", 
    to: toEmail,
    subject: 'Package Arrived Notification',
    text: `Dear Customer, your package with tracking number ${packageInfo.trackingNumber} has arrived at the destination. Thank you for using our service!`, 
    html: `<p>Dear Customer,</p><p>Your package with tracking number <b>${packageInfo.trackingNumber}</b> has arrived at the destination. Thank you for using our service!</p><br><p>This is an auto-generated email, please do not reply</p>` 
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending email');
  }
};
