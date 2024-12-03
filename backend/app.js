import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import startUpRoutes from './Route/startUpRoute.js';

const app = express();

// MongoDB Connection URI for existing database 'navsarjan'
const mongoURI = 'mongodb+srv://navsarjansih:navsarjansih@navsarjan.nqyo7.mongodb.net/navsarjan?retryWrites=true&w=majority&appName=Navsarjan';

// MongoDB Connection
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB: navsarjan database')) // Ensure this is the correct database
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  credentials: true,
}));
app.use(express.json());

// Default Route
app.get('/', (req, res) => {
  res.send("<h6>Welcome to backend</h6>");
});

// Custom Routes
app.use("/home/startup", startUpRoutes); // Ensure startUpRoutes is properly exported and matches


app.get('/',(req,res)=>{
    
    res.send("<h6>Welcome to backened </h6>");
})

// Routes
app.use('/home/startUp', startUpRoutes);






//making port 
const port= '8081' || process.env.PORT ;
app.listen(port,()=>{
    console.log(`server listening at http://localhost:${port}`)
})




/*
mongodb+srv://navsarjansih:navsarjansih@navsarjan.nqyo7.mongodb.net/?retryWrites=true&w=majority&appName=Navsarjan
*/

