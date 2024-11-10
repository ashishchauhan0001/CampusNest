import express from "express";
import { addRequest } from "../controllers/request.controller.js";

const router=express.Router();

router.post('/addrequest',addRequest);

export default router;