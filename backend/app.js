import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from "http";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import startUpRoutes from './Route/startUpRoute.js';
import userAuthRoutes from './Route/authRoute.js';
import projectRoutes from './Route/projectRoute.js'
import userProfileRoutes from './Route/profileRoute.js';
import chatRoutes from './Route/chatRoute.js';
import notificationRoutes from './Route/notificationRoute.js';
import { handleSocketConnection } from './Controller/socketController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;
const mongoURI = process.env.MONGO_URI || 'your-default-mongo-uri';

// MongoDB Connection
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());

const httpServer = createServer(app);


const io=new Server(httpServer,{
    cors:{
        origin:"http://localhost:3000"
    }
});


// Default Route
app.get('/', (req, res) => {
  res.send('<h6>Welcome to the Navsarjan Backend</h6>');
});

// Routes
app.use('/home/startUp', startUpRoutes);
app.use('/home/Projects', projectRoutes);
app.use('/home', userAuthRoutes);
app.use('/home/profile',userProfileRoutes);
app.use('/home/chat',chatRoutes);
app.use('/home/notification',notificationRoutes);


// Socket.IO
io.on("connection", (socket) => handleSocketConnection(io, socket));


// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Error occurred:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});


httpServer.listen(PORT,()=>{
  console.log(`server listening at http://localhost:${PORT}`)
})
