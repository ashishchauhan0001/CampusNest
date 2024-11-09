import express from "express";
import { addVendor, removeVendor, updateVendor, getVendor, getVendors } from '../controllers/vendor.controller.js';
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/addvendor', addVendor);
router.post('/removevandor/:id', verifyToken, removeVendor);
router.post('/updatevendor/:id', verifyToken, updateVendor);
router.get('/getvendor/:id', getVendor);
router.get('/allvendors', getVendors);

export default router;