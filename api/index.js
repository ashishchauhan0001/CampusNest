import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import listingVendor from './routes/vendor.route.js';
import addrequest from './routes/request.route.js'
import tenant from './routes/tenant.route.js'
import review from './routes/review.route.js'
import addPayment from './routes/razorpay.route.js'
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
dotenv.config()


const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();

app.use(express.json());

app.use(cors());


app.use(cookieParser());


app.listen(PORT, () => {
  console.log('Server is running on port !',{PORT});
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
app.use('/api/vendor', listingVendor);
app.use('/api/tenant',tenant);
app.use('/api/review',review);
app.use('/api/request',addrequest);
app.use("/api/payment", addPayment);



app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
