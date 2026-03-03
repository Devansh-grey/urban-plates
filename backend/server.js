import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoutes.js';
import userRoute from './routes/userRoutes.js';

dotenv.config();

// app config
const app = express();

// middleware
app.use(express.json());
app.use(cors());


// db connection
connectDB();


// api endpoints
app.use("/api/food",foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user",userRoute)

app.get("/",(req,res)=>{
    res.send("Api working")
});

const PORT = process.env.PORT || 4000;
app.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`);
    
})