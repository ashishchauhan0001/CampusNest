import express from "express";
import { addRequest,getRequest,updateStatus,getProperty} from "../controllers/request.controller.js";

const router=express.Router();

router.post('/addrequest',addRequest);
router.get('/getrequest/:id',getRequest);
router.put('/updateStatus/:id',updateStatus);
router.get('/getproperty/:id',getProperty);

export default router;