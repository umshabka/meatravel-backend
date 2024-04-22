import Booking from "../models/Booking.js";
import exceljs from 'exceljs';
import User from "../models/User.js"
import sendBookingConfirmationEmail from "./Functions/SendBookingConfirmationEmail.js"
// import { Response } from 'express';

// Create new Booking
export const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    const savedBooking = await newBooking.save();
    await sendBookingConfirmationEmail(savedBooking) // To send email to the admin
    res
      .status(200)
      .json({
        success: true,
        message: "Your tour is booked",
        data: savedBooking,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: `Internal Server Error, ${error}`
      });
  }
};

//get Single Booking
export const getBooking = async (req, res) => {
  const id = req.params.id

  try {
    const book = await Booking.findById(id)

    res
      .status(200)
      .json({
        success: true,
        message: "Success",
        data: book,
      });
  } catch (error) {
    res
      .status(404)
      .json({
        success: false,
        message: "Not Found"
      });
  }
};

//get all Bookings
export const getAllBooking = async (req, res) => {
  const id = req.params.id

  try {
    const books = await Booking.find()

    res
      .status(200)
      .json({
        success: true,
        message: "Success",
        data: books,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "internal server error"
      });
  }
};

export const daleteBooking = async (req, res) => {
  const id = req.params.id;

  try {
    await Booking.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete",
    });
  }
};


// Controller function to generate and download Excel sheet
export const downloadBookingsExcel = async (req, res) => {
  try {
    const bookings = await Booking.find();
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Bookings');

    worksheet.columns = [
      { header: 'Tour Name', key: 'tourName', width: 20 },
      { header: 'User Email', key: 'userEmail', width: 20 },
      { header: 'User ID', key: 'userId', width: 20 },
      { header: 'Username', key: 'username', width: 20 },
      { header: 'Full Name', key: 'fullName', width: 20 },
      { header: 'Phone', key: 'phone', width: 20 },
      { header: 'Nationality', key: 'nationality', width: 20 },
      { header: 'Booked At', key: 'bookAt', width: 20 },
      { header: 'Guest Size', key: 'guestSize', width: 20 },
      { header: 'Rooms', key: 'rooms', width: 60 },
    ];

    for (const booking of bookings) {
      const user = await User.findById(booking.userId);
      if (!user) continue;
      
      const roomsInfo = booking.rooms.map(room => `Room ID: ${room._id}, Bed Types: ${room.bedTypes}, Children: ${room.children}, Adults: ${room.adults}`).join('\n');
      worksheet.addRow({
        userEmail: booking.userEmail,
        userId: booking.userId,
        username: user.username,
        tourName: booking.tourName,
        fullName: booking.fullName,
        guestSize: booking.guestSize,
        phone: booking.phone,
        nationality: booking.nationality,
        bookAt: booking.bookAt.toISOString(),
        rooms: roomsInfo,
      });
    }

    // Stream Excel workbook to response
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=bookings.xlsx');
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error generating Excel:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error', error
    });
  }
};