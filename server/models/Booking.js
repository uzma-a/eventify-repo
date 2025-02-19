import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String }, // Add email field
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  tickets: { type: Number, required: true },
  seatCategory: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
