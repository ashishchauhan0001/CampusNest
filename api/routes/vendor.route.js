import express from "express";
import { addVendor, removeVendor, updateVendor, getVendor, getVendors } from '../controllers/vendor.controller.js';
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/addvendor', addVendor);
router.post('/removevandor/:id', verifyToken, removeVendor);
router.get('/onevendor/:id', verifyToken, getVendor);
router.get('/allvendors', verifyToken, getVendors);
router.post('/updatevendor/:id', verifyToken, updateVendor);

export default router;