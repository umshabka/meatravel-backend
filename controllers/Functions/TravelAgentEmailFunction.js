import nodemailer from "nodemailer";

const TravelAgentEmailFunction = async () => {

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
            to: 'sales@mea-travel.com',
            subject: 'New Travel Agent Account, Mea-Travel',
            html: `
        <p>Hello,</p>
        <p>A new travel agent account is waiting for your verification.</p>
        <p>Please check Mea-Travel dashboard to verify it.</p>
      `,
        };

        await transporter.sendMail(mailOptions);
        console.log('A new travel agent account email sent successfully.');
    } catch (error) {
        console.error('Error sending A new travel agent account email:', error);
    }
};

export default TravelAgentEmailFunction
