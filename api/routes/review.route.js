import express from 'express';
import {addReview,getReviews} from '../controllers/review.controller.js';
const router = express.Router();

router.post('/addreview',addReview);
router.get('/getreview/:id',getReviews);
export default router;