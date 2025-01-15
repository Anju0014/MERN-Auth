import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoute.mjs'
import authRoutes from './routes/authRoute.mjs'
import cookieParser from 'cookie-parser'
dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connected to Mongo DB')
}).catch((err)=>{
    console.log(err)
})
const app=express();
app.use(express.json());
app.use(cookieParser());




app.listen(3000,()=>{
        console.log('Server listening on port 3000!')
    }
)
app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;  
    const message = err.message || 'Something went wrong!';
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode,
    })
      
    });
