import nodemailer from "nodemailer";

const sendBookingConfirmationEmail = async (booking, accountType) => {

    try {
        const transporter = nodemailer.createTransport({
            host: 'mail.mea-travel.com',
            port: 465,
            auth: {
                user: process.env.VERIFICATION_EMAIL,
                pass: process.env.VERIFICATION_PASSWORD
            }
        });

        const roomsHtml = booking.rooms.map(room => `
            <li>
                <strong>Room Number:</strong> ${room._id+1}<br>
                <strong>Bed Types:</strong> ${room.bedTypes}<br>
                <strong>Children:</strong> ${room.children}<br>
                <strong>Adults:</strong> ${room.adults}<br>
            </li>
        `).join('');


        let recipientEmail = 'booking@mea-travel.com';
        if (accountType === 'TravelAgent') {
            recipientEmail = 'sales@mea-travel.com';
        } else recipientEmail = 'booking@mea-travel.com';

        const bookAtDateOnly = booking.bookAt ? booking.bookAt.toISOString().split('T')[0] : '';

        const mailOptions = {
            from: process.env.VERIFICATION_EMAIL,
            to: recipientEmail,
            subject: 'New Booking, Mea-Travel',
            // text: `A new booking has been made:\n\n${JSON.stringify(booking, null, 2)}`
            html: `
        <p>Hello,</p>
        <p>A new booking has been arrived. Here are the details:</p>
        <ul>
          <li><strong>User ID:</strong> ${booking.userId}</li>
          <li><strong>User Email:</strong> ${booking.userEmail}</li>
          <li><strong>Tour Name:</strong> ${booking.tourName}</li>
          <li><strong>Full Name:</strong> ${booking.fullName}</li>
          <li><strong>Phone:</strong> ${booking.phone}</li>
          <li><strong>Nationality:</strong> ${booking.nationality}</li>
          <li><strong>Start Day Of The Trip:</strong> ${bookAtDateOnly}</li>
          <li><strong>Guest Size:</strong> ${booking.guestSize}</li>
          <li><strong>Rooms:</strong></li>
            <ul>${roomsHtml}</ul>
        </ul>
      `,
        };

        await transporter.sendMail(mailOptions);
        console.log('Booking confirmation email sent successfully.');
    } catch (error) {
        console.error('Error sending booking confirmation email:', error);
    }
};

export default sendBookingConfirmationEmail
