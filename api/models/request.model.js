import mongoose, { Schema } from "mongoose";


const request = new mongoose.Schema(
    {
        vendorId: {
            type: String,
            required: true,
        },
        tenantData: {
            type: Object,
            required: true,
        },
        status: {
            type: String,
            default: 'pending'

        },
        propertyId: {
            type: mongoose.ObjectId,
            ref: 'VendorListing',

        }

    },
    { timestamps: true }
);

const requestData = mongoose.model('requestData',
    request);


export default requestData;    