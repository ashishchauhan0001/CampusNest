import express from "express";
import Razorpay from "razorpay";
import { createOrder, verifyPayment } from "../controllers/razorpay.controller.js";

const router = express.Router();


router.post('/create-order', createOrder);

router.post('/verify-payment', verifyPayment);

export default router;
