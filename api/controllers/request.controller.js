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

export const getRequest =async(req,res,next)=>{
   try {
    const request=await requestData.find({vendorId:req.params.id});
    return res.status(201).json({
        success: true,
        message:" Data Fetched Successfully",
        request,
   })
   } catch (error) {
    console.error(" Error in Fetching Data: ", error);
    next(errorHandler(500,"Failed to Fetch the data.Pls Try again Later."));
   }
}

export const updateStatus = async (req, res, next) => {
   try {
       const { status } = req.body;
       const tenantId = req.params.id;

       // Update the status in the database
       const updatedRequest = await requestData.findByIdAndUpdate(
           tenantId,
           { status },
           { new: true }
       );

       if (!updatedRequest) {
           return res.status(404).json({
               success: false,
               message: "Request not found."
           });
       }

       res.status(200).json({
           success: true,
           message: `Status updated to '${status}' successfully.`,
           updatedRequest
       });
   } catch (error) {
       console.error("Error in updateStatus:", error);
       next(errorHandler(500, "Failed to update status. Please try again later."));
   }
};

export const getProperty = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      // Find the RequestData document by its ID and populate the vendorListingId field
      const responseData = await requestData.find({"tenantData.userID" : id}).populate('propertyId');
  
      // Check if the document was found
      if (!responseData) {
        return res.status(404).json({ message: 'Property not found' });
      }
  
      // Return the populated property data
      res.status(201).json({
        success:true,
        message:"Data fected successfully",
        responseData
      });
    } catch (error) {
      console.error(error);
      next(errorHandler(500, "Failed to fetch the Data"));
    }
  };
