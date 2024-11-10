import express from "express";
import { addTenant } from "../controllers/tenant.controller.js";

const router=express.Router();

router.post('/addtenant',addTenant);

export default router;
