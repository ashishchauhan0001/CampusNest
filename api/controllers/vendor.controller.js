import VendorListing from '../models/vendor.model.js';
import { errorHandler } from '../utils/error.js';

// Create a new vendor listing (similar to createListing)
// export const addVendor = async (req, res, next) => {
//     try {
//         const vendor = await VendorListing.create(req.body);
//         return res.status(201).json(vendor);
//     } catch (error) {
//         console.log(error,68)
//         next(error);
//     }
// };
export const addVendor = async (req, res, next) => {
    try {
        const vendor = await VendorListing.create(req.body);
        return res.status(201).json({
            success: true,
            message: "Vendor added successfully",
            vendor
        });
    } catch (error) {
        console.error("Error adding vendor:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to add vendor. Please try again later.",
            error: error.message // Consider omitting this in production for security
        });
    }
};

// Delete vendor listing (similar to deleteListing)
export const removeVendor = async (req, res, next) => {
    const vendor = await VendorListing.findById(req.params.id);

    if (!vendor) {
        return next(errorHandler(404, 'Vendor listing not found!'));
    }


    try {
        await VendorListing.findByIdAndDelete(req.params.id);
        res.status(200).json('Vendor listing has been removed!');
    } catch (error) {
        next(error);
    }
};

// Update vendor listing (similar to updateListing)
export const updateVendor = async (req, res, next) => {
    const vendor = await VendorListing.findById(req.params.id);

    if (!vendor) {
        return next(errorHandler(404, 'Vendor listing not found!'));
    }



    try {
        const updatedVendor = await VendorListing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedVendor);
    } catch (error) {
        next(error);
    }
};

// Get a single vendor listing (similar to getListing)
export const getVendor = async (req, res, next) => {
    try {
        const vendor = await VendorListing.findById(req.params.id);
        if (!vendor) {
            return next(errorHandler(404, 'Vendor listing not found!'));
        }
        res.status(200).json(vendor);
    } catch (error) {
        next(error);
    }
};

// Get all vendor listings (similar to getListings)
export const getVendors = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;

        const vendors = await VendorListing.find({})
            .limit(limit)
            .skip(startIndex);
        return res.status(200).json(vendors);
    } catch (error) {
        next(error);
    }
};

