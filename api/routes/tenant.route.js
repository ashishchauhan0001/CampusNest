import express from "express";
import { addTenant,getTenant } from "../controllers/tenant.controller.js";

const router=express.Router();

router.post('/addtenant',addTenant);
router.get('/gettenant/:id',getTenant);


export default router;
