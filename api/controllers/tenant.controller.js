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

export const getTenant = async (req, res, next) => {
    try {
        const tenant = await tenantProfile.findOne({ userID: req.params.id }); // Use req.params.id
        if (!tenant) {
            return res.status(404).json({
                success: false,
                message: "Tenant Profile not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Tenant Profile Fetched Successfully",
            tenant,
        });
    } catch (error) {
        console.error("Error in Fetching Profile:", error);
        next(errorHandler(500, "Failed to Fetch Profile. Please try again later."));
    }
};