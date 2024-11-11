import express from "express";
import { addRequest,getRequest,updateStatus} from "../controllers/request.controller.js";

const router=express.Router();

router.post('/addrequest',addRequest);
router.get('/getrequest/:id',getRequest);
router.put('/updateStatus/:id',updateStatus);

export default router;