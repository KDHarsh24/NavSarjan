import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import startUpRoutes from './Route/startUpRoute.js';



const app=express();

const mongoURI = 'mongodb+srv://navsarjansih:navsarjansih@navsarjan.nqyo7.mongodb.net/?retryWrites=true&w=majority&appName=Navsarjan';   
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB: testing database'))
    .catch((err) => console.error('Failed to connect to MongoDB:', err));


app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json())



app.get('/',(req,res)=>{
    
    res.send("<h6>Welcome to backened </h6>");
})

// Routes
app.use("/home/startUp", startUpRoutes);






//making port 
const port= '8081' || process.env.PORT ;

httpServer.listen(port,()=>{
    console.log(`server listening at http://localhost:${port}`)
})




/*
mongodb+srv://navsarjansih:navsarjansih@navsarjan.nqyo7.mongodb.net/?retryWrites=true&w=majority&appName=Navsarjan
*/
