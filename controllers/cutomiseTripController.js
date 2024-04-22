import CutomiseTrip from '../models/CutomiseTrip.js';
import exceljs from 'exceljs';

// Create a new custom trip
export const createCutomiseTrip = async (req, res) => {
  try {
    const cutomiseTrip = await CutomiseTrip.create(req.body);
    res.status(201).json(cutomiseTrip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all custom trips
export const getCutomiseTrips = async (req, res) => {
  try {
    const cutomiseTrips = await CutomiseTrip.find();
    res.status(200).json(cutomiseTrips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single custom trip by ID
export const getCutomiseTripById = async (req, res) => {
  try {
    const cutomiseTrip = await CutomiseTrip.findById(req.params.id);
    if (!cutomiseTrip) {
      return res.status(404).json({ message: 'Custom trip not found' });
    }
    res.status(200).json(cutomiseTrip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a custom trip by ID
export const updateCutomiseTripById = async (req, res) => {
  try {
    const cutomiseTrip = await CutomiseTrip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cutomiseTrip) {
      return res.status(404).json({ message: 'Custom trip not found' });
    }
    res.status(200).json(cutomiseTrip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a custom trip by ID
export const deleteCutomiseTripById = async (req, res) => {
  try {
    const cutomiseTrip = await CutomiseTrip.findByIdAndDelete(req.params.id);
    if (!cutomiseTrip) {
      return res.status(404).json({ message: 'Custom trip not found' });
    }
    res.status(200).json({ message: 'Custom trip deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Controller function to generate and download Excel sheet
export const downloadBookingsExcel = async (req, res) => {
  try {
    const cutomiseTrips = await CutomiseTrip.find();
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('TripRequests');

    // Define column headers
    worksheet.columns = [
      { header: 'State', key: 'state', width: 10 },
      { header: 'First Name', key: 'firstName', width: 15 },
      { header: 'Last Name', key: 'lastName', width: 15 },
      { header: 'Email', key: 'email', width: 20 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'Destination', key: 'destination', width: 20 },
      { header: 'Date', key: 'date', width: 20 },
      { header: 'Flexible', key: 'flexible', width: 10 },
      { header: 'Trip Length', key: 'tripLength', width: 10 },
      { header: 'Rooms', key: 'rooms', width: 50 },
      { header: 'Budget', key: 'budget', width: 10 },
      { header: 'Include International Flights', key: 'includeInternationalFlights', width: 20 },
      { header: 'Client Preferences', key: 'clientPreferences', width: 20 },
      { header: 'Additional Notes', key: 'additionalNotes', width: 40 },
    ];

    // Add data rows
    cutomiseTrips.forEach((trip) => {
      const roomsData = trip.rooms.map((room, index) => {
        return `Room ${index + 1}: Bed Type: ${room.bedTypes}, Children: ${room.children}, Adults: ${room.adults}`;
      });

      worksheet.addRow({
        destination: trip.destination,
        date: trip.date.toISOString(), 
        flexible: trip.flexible ? 'Yes' : 'No', 
        tripLength: trip.tripLength,
        rooms: roomsData.join('\n'),
        budget: trip.budget,
        includeInternationalFlights: trip.includeInternationalFlights ? 'Yes' : 'No',
        clientPreferences: trip.clientPreferences,
        email: trip.email,
        firstName: trip.firstName,
        lastName: trip.lastName,
        phone: trip.phone,
        additionalNotes: trip.additionalNotes,
        state: trip.state,
      });
    });

    // Stream Excel workbook to response
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=bookings.xlsx');
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error generating Excel:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
