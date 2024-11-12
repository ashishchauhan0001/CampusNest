import mongoose, { Schema } from "mongoose";
import VendorListing from './vendor.model.js';

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
        propertyId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'VendorListing',
            required:true,
        }

    },
    { timestamps: true }
);

const requestData = mongoose.model('requestData',
    request);

export default requestData;    