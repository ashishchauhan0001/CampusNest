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
    const vendor = await VendorListing.find({
      $or: [
        { _id: req.params.id },
        { vendorId: req.params.id }
      ]
    });
    if (!vendor) {
      return next(errorHandler(404, "Vendor listing not found!"));
    }
    res.status(200).json(vendor);
  } catch (error) {
    next(errorHandler(500, "Failed to fetch vendor."));
  }
};

// Get all vendor listings
export const getVendors = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8;
    const startIndex = parseInt(req.query.startIndex) || 0;

    // Parse amenities from JSON string in query
    let amenities = {};
    try {
      amenities = JSON.parse(req.query.amenities || "{}");
    } catch (error) {
      return res.status(400).json({ message: "Invalid amenities format." });
    }

    // Construct filters for amenities with true values only
    const filters = {};
    Object.keys(amenities).forEach((key) => {
      if (amenities[key] === true) {
        filters[key] = true;
      }
    });

    const searchTerm = req.query.searchTerm || "";
    const sortField = req.query.sort || "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;

    // MongoDB query
    const listings = await VendorListing.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { address: { $regex: searchTerm, $options: "i" } }
      ],
      ...filters,
    })
      .sort({ rent: order })
      .limit(limit)
      .skip(startIndex);

    res.status(200).json(listings);
  } catch (error) {
    console.error("Error fetching vendors:", error);
    res.status(500).json({ message: "Failed to fetch vendors." });
  }
};