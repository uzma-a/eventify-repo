import express from 'express';
import Booking from '../models/Booking.js';
import { io } from '../server.js';

const router = express.Router();

router.post('/book', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.json({ message: 'Booking successful!', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error saving booking' });
  }
});

// Fetch all bookings
router.get('/all', async (req, res) => {
  try {
    const bookings = await Booking.find(); // Fetch all bookings from MongoDB
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

export default router;
