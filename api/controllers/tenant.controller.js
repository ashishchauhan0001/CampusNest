import tenantProfile from '../models/tenant.model.js'
import { errorHandler } from '../utils/error.js'

// Adding tenant profile into DB

export const addTenant= async(req,res,next)=>{
    try {
        const tenant= await tenantProfile.create(req.body);
        return res.status(201).json({
            success: true,
            message:"Tenant Profile Created Successfully",
            tenant,
        });
    } catch (error) {
        console.error(" Error in creating Profile: ", error);
        next(errorHandler(500,"Failed to create Profile.Pls Try again Later."));
    }
};