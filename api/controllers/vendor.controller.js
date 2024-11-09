import VendorListing from "../models/vendor.model.js";
import { errorHandler } from "../utils/error.js";

// Add a new vendor listing
export const addVendor = async (req, res, next) => {
  try {
    const vendor = await VendorListing.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Vendor added successfully",
      vendor,
    });
  } catch (error) {
    console.error("Error adding vendor:", error);
    next(errorHandler(500, "Failed to add vendor. Please try again later."));
  }
};

// Delete a vendor listing
export const removeVendor = async (req, res, next) => {
  try {
    const vendor = await VendorListing.findById(req.params.id);
    if (!vendor) {
      return next(errorHandler(404, "Vendor listing not found!"));
    }
    await VendorListing.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Vendor listing has been removed!" });
  } catch (error) {
    next(errorHandler(500, "Failed to remove vendor."));
  }
};

// Update a vendor listing
export const updateVendor = async (req, res, next) => {
  try {
    const vendor = await VendorListing.findById(req.params.id);
    if (!vendor) {
      return next(errorHandler(404, "Vendor listing not found!"));
    }
    const updatedVendor = await VendorListing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ success: true, vendor: updatedVendor });
  } catch (error) {
    next(errorHandler(500, "Failed to update vendor."));
  }
};

// Get a single vendor listing
export const getVendor = async (req, res, next) => {
  try {
    const vendor = await VendorListing.findById(req.params.id);
    if (!vendor) {
      return next(errorHandler(404, "Vendor listing not found!"));
    }
    res.status(200).json(vendor);
  } catch (error) {
    next(errorHandler(500, "Failed to fetch vendor."));
  }
};

// Get all vendor listings
export const getVendors = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 8;
    const startIndex = parseInt(req.query.startIndex) || 0;

    // Safer JSON parsing
    let amenities = {};
    try {
      amenities = JSON.parse(req.query.amenities || "{}");
    } catch (error) {
      return next(errorHandler(400, "Invalid amenities format."));
    }

    // Helper function to parse boolean values correctly
    const parseBoolean = (value) => {
      if (value === "true") return true;
      if (value === "false") return false;
      return undefined;
    };

    // Construct filters with parsed boolean values
    const filters = {
      ...(parseBoolean(amenities.parking) !== undefined && { parking: parseBoolean(amenities.parking) }),
      ...(parseBoolean(amenities.furnished) !== undefined && { furnished: parseBoolean(amenities.furnished) }),
      ...(parseBoolean(amenities.wifi) !== undefined && { wifi: parseBoolean(amenities.wifi) }),
      ...(parseBoolean(amenities.mess) !== undefined && { mess: parseBoolean(amenities.mess) }),
      ...(parseBoolean(amenities.gym) !== undefined && { gym: parseBoolean(amenities.gym) }),
      ...(parseBoolean(amenities.ac) !== undefined && { ac: parseBoolean(amenities.ac) }),
      ...(parseBoolean(amenities.electricBackup) !== undefined && { electricBackup: parseBoolean(amenities.electricBackup) }),
      ...(parseBoolean(amenities.laundry) !== undefined && { laundry: parseBoolean(amenities.laundry) }),
      ...(parseBoolean(amenities.houseKeeping) !== undefined && { houseKeeping: parseBoolean(amenities.houseKeeping) }),
    };

    // Debug logs
    console.log("Parsed Amenities:", amenities);
    console.log("Constructed Filters:", filters);

    const searchTerm = req.query.searchTerm || "";
    const sortField = req.query.sort || "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;

    // MongoDB query
    const listings = await VendorListing.find({
      name: { $regex: searchTerm, $options: "i" },
      ...filters,
    })
      .sort({ [sortField]: order })
      .limit(limit)
      .skip(startIndex);

    console.log("Listings:", listings);

    res.status(200).json(listings);
  } catch (error) {
    console.error("Error fetching vendors:", error);
    next(errorHandler(500, "Failed to fetch vendors."));
  }
};
