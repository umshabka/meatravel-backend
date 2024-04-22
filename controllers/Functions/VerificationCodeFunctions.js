import User from "../../models/User.js";
import nodemailer from "nodemailer";

// Function to generate a random verification code
export function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000); // 6-digit code
}

// Function to send verification email
export const sendVerificationEmail = async (email, verificationCode) => {
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
            subject: 'Verification Code',
            // text: `Your verification code is: ${verificationCode}`
            html: `
            <p>Hello,</p>
            <p>Welcome to <strong>MEA-Travel</strong></p>
            <br/>
            <p>Your verification code is: <strong> ${verificationCode} </strong></p>
            <p><strong> Do not share this code with any one for your account security. </strong></p>

            <p>Thank You</p>
          `,
        };

        await transporter.sendMail(mailOptions);

        console.log("Verification email sent successfully");
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw new Error("Failed to send verification email");
    }
};

// Controller to send verification code
export const sendVerificationCode = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Email not found",
            });
        }

        // Generate verification code
        const verificationCode = generateVerificationCode();
        // Send the verification code to the user
        await sendVerificationEmail(email, verificationCode);

        res.status(200).json({
            success: true,
            message: "Verification code sent successfully",
            data: user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};