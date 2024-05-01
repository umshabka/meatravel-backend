import nodemailer from "nodemailer";

const TravelAgentEmailVerificationFunction = async (email) => {

    try {
        const transporter = nodemailer.createTransport({
            host: 'mail.mea-travel.com',
            port: 465,
            auth: {
                user: process.env.VERIFICATION_EMAIL,
                pass: process.env.VERIFICATION_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.VERIFICATION_EMAIL,
            to: email,
            subject: 'Account Verified, Welcome To Mea-Travel',
            html: `
            <p>Hello,</p>
            <p>Welcome to <strong>MEA-Travel</strong></p>
            <p>Your account registration has been accepted as travel agent by the MEA-Travel team, granting you access to our platform.</p>
            <p>MEA-Travel Team</p>
      `,
        };

        await transporter.sendMail(mailOptions);
        console.log('travel agent email Verification sent successfully.');
    } catch (error) {
        console.error('Error sending travel agent email Verification:', error);
    }
};

export default TravelAgentEmailVerificationFunction
