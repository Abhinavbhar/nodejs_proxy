import User from "../Db/userSchema.js"

const updateBandwidth=async(ip,bandwidth)=>{
    const existingUser = await User.findOne({ipAddress:ip})
    if(!existingUser){
        const newUser =new User({
            ipAddress:ip,
            bandwidthUsed:bandwidth
        })
        await newUser.save()
        
    }
    else{
        
        existingUser.bandwidthUsed=bandwidth+existingUser.bandwidthUsed
        await existingUser.save()
    }
}
export default updateBandwidth