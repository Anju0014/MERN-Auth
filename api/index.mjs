import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoute.mjs'
import authRoutes from './routes/authRoute.mjs'
import adminRoutes from './routes/adminRoute.mjs'
import cookieParser from 'cookie-parser'
import path from 'path'
dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connected to Mongo DB')
}).catch((err)=>{
    console.log(err)
})
const __dirname=path.resolve();
const app=express();

app.use(express.static(path.join(__dirname,'/client/dist')))
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})
app.use(express.json());
app.use(cookieParser());




app.listen(3000,()=>{
        console.log('Server listening on port 3000!')
    }
)
app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/admin',adminRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;  
    const message = err.message || 'Something went wrong!';
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode,
    })
      
    });
