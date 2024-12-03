import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io';
import { createServer } from "http";
import mongoose from 'mongoose';
import chatRoutes from './Route/chatRoute.js';
import notificationRoutes from './Route/notificationRoute.js';
import { handleSocketConnection } from './Controller/socketController.js';



const app=express();

const mongoURI = 'mongodb://localhost:27017/testing';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB: testing database'))
    .catch((err) => console.error('Failed to connect to MongoDB:', err));


app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json())
const httpServer = createServer(app);


const io=new Server(httpServer,{
    cors:{
        origin:"http://localhost:3000"
    }
});


app.get('/',(req,res)=>{
    
    res.send("<h6>Welcome to backened </h6>");
})




// Routes
app.use("/home/chat", chatRoutes);
app.use("/home/notification", notificationRoutes);

// Socket.IO
io.on("connection", (socket) => handleSocketConnection(io, socket));




//making port 
const port= '8081' ||process.env.PORT ;

httpServer.listen(port,()=>{
    console.log(`server listening at http://localhost:${port}`)
})





