import mongoose, { Schema, isValidObjectId } from 'mongoose';

const vendorSchema = new mongoose.Schema(
  {
    vendorId: {
      type: Schema.Types.ObjectId

    },
    name: {
      type: String,
      required: true,

    },
    description: {
      type: String,

    },
    address: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    security: {
      type: Number,
      required: true,
    },
    marketDistance: {
      type: Number,
      required: true,
    },
    availRooms: {
      type: Number,
      required: true,
    },
    totalRooms: {
      type: Number,
      required: true,
    },
    // to do 'Wi-Fi', 'Parking', 'Laundry', 'Mess', 'AC', 'Gym', 'Furnished','Electric Backup','House Keeping'
    wifi: {
      type: Boolean,
      default: false,
    },
    parking: {
      type: Boolean,
      default: false,
    },
    laundry: {
      type: Boolean,
      default: false,
    },
    mess: {
      type: Boolean,
      default: false,
    },
    ac: {
      type: Boolean,
      default: false,
    },
    gym: {
      type: Boolean,
      default: false,
    },
    furnished: {
      type: Boolean,
      default: false,
    },
    electricBackup: {
      type: Boolean,
      default: false,
    },
    houseKeeping: {
      type: Boolean,
      default: false,
    },
    imageURL: {
      type: Array,
    },
    tenants:{
      type:Array,
    },
    calendar:{
      type:String,
    }
  },
  { timestamps: true }
);

const VendorListing = mongoose.model("VendorListing", vendorSchema);

export default VendorListing;
