import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';

import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';

const app = express();
const port = process.env.PORT || 3000;
const frontendUrl = 'https://eventify-frontend-hyvw.onrender.com' || 'http://localhost:5173';

// Create HTTP Server
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: [frontendUrl], credentials: true }
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: [frontendUrl], credentials: true }));

// Handle WebSocket Connection
io.on('connection', (socket) => {
  console.log('⚡ A user connected');

  socket.on('disconnect', () => {
    console.log('❌ User disconnected');
  });
});

// Export `io` for use in other files
export { io };

// Connect to Database Before Starting Server
connectDB()
  .then(() => {
    console.log("✅ Database connected successfully");

    // API Endpoints
    app.get('/', (req, res) => res.send('API working fine'));
    app.use('/api/auth', authRouter);
    app.use('/api/user', userRouter);
    app.use('/api/bookings', bookingRouter); // Booking route

    // Start Server
    server.listen(port, () => {
      console.log(`🚀 Server is running on PORT ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1); // Stop server if DB fails
  });
