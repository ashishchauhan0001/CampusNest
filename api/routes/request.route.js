import express from "express";
import { addRequest,getRequest} from "../controllers/request.controller.js";

const router=express.Router();

router.post('/addrequest',addRequest);
router.get('/getrequest/:id',getRequest);

export default router;