import express from 'express';
import cors from 'cors';
import VendorListing from '../models/vendor.model.js'; // Your vendor model file path

const router = express.Router();
const app = express();

app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(cors()); // Middleware for handling CORS

// Mount the router
app.use('/', router);

// POST API for adding a new vendor listing
router.post('/addvendor', async (req, res) => {
    try {
        let vendors = await VendorListing.find({}); // Retrieve all listings from the database
        let id;

        if (vendors.length > 0) {
            let last_vendor = vendors[vendors.length - 1]; // Get the last vendor in the array
            id = last_vendor.id + 1; // Increment the ID
        } else {
            id = 1; // Start from ID 1 if no vendors exist
        }

        const vendor = new VendorListing({
            id: id,
            address: req.body.address, // Ensure these match your request body
            state: req.body.state,
            city: req.body.city,
            rent: req.body.rent,
            security: req.body.security,
            marketDistance: req.body.marketDistance,
            availRooms: req.body.availRooms,
            totalRooms: req.body.totalRooms,
            wifi: req.body.wifi,
            parking: req.body.parking,
            laundry: req.body.laundry,
            mess: req.body.mess,
            ac: req.body.ac,
            gym: req.body.gym,
            furnished: req.body.furnished,
            electricBackup: req.body.electricBackup,
            houseKeeping: req.body.houseKeeping,
            imageURL: req.body.imageURL
        });

        await vendor.save(); // Save the vendor listing
        console.log("Vendor listing saved");

        res.json({
            success: true,
            message: "Vendor listing added successfully",
        });
    } catch (error) {
        console.error("Error saving vendor listing:", error);
        res.status(500).json({
            success: false,
            message: "Failed to save vendor listing",
        });
    }
});

// POST API for removing a vendor listing
router.post('/removevendor', async (req, res) => {
    try {
        await VendorListing.findOneAndDelete({ id: req.body.id });
        console.log("Vendor listing removed");
        res.json({
            success: true,
            message: "Vendor listing removed successfully",
        });
    } catch (error) {
        console.error("Error removing vendor listing:", error);
        res.status(500).json({
            success: false,
            message: "Failed to remove vendor listing",
        });
    }
});

// GET API for fetching all vendor listings
router.get('/allvendors', async (req, res) => {
    try {
        let vendors = await VendorListing.find({});
        console.log("All Vendor Listings Fetched");
        res.json(vendors);
    } catch (error) {
        console.error("Error fetching vendors:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch vendor listings",
        });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

export default router;
