import mongoose, { Schema } from "mongoose";


const review = new mongoose.Schema(
    {
        propertyId: {
            type: mongoose.Types.ObjectId,
            ref: 'VendorListing',

        },

        review: {
            type: Array,

        },


    },
    { timestamps: true }
);

const reviewData = mongoose.model('reviewData',
    review);


export default reviewData;    