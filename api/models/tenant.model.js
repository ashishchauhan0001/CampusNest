import mongoose,{Schema} from "mongoose";


const tenantSchema= new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        address:{
            type:String,
            required:true,
        },
        designation:{
            type:String,
            required:true,
        },
        aadhaarNo:{
            type:Number,
            required:true,
        },
        organization:{
            type:String,
            required:true,
        },
        skills:{
            type: Array,
            required: true,
        },
        experience:{
            type:Number,
            required:true,
        },
        aadhaarURL:{
            type:String,
        }
    },
    {timestamps:true}
);

const tenantProfile=mongoose.model('tenantProfile',
    tenantSchema);
  
export default tenantProfile;    