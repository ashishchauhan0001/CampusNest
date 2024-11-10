import requestData from "../models/request.model.js";
import { errorHandler } from "../utils/error.js";


export const addRequest =async(req,res,next)=>{
   try {
    const request=await requestData.create(req.body);
    return res.status(201).json({
        success: true,
        message:"Request Added Successfully",
        request,
   })
   } catch (error) {
    console.error(" Error in Request Adding: ", error);
    next(errorHandler(500,"Failed to  make a request.Pls Try again Later."));
   }
}