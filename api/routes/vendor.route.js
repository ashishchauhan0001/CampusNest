import express from "express";
import { addVendor, removeVendor, updateVendor, getVendor, getVendors } from '../controllers/vendor.controller.js';
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/addvendor', addVendor);
router.delete('/removevendor/:id', verifyToken, removeVendor);
router.put('/updatevendor/:id', verifyToken, updateVendor);
router.get('/getvendor/:id', getVendor);
router.get('/allvendors', getVendors);

export default router;