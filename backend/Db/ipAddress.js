import mongoose, { mongo } from "mongoose";
const ipAddressSchema = new mongoose.Schema({
    ipAddress:{
        type:String,
        required:true,  
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    valid:{
        type:Boolean,
        default:false
    }
})
const Ip = mongoose.model("Ip",ipAddressSchema)
export default Ip