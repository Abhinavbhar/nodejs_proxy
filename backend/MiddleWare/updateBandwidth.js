import User from "../Db/userSchema.js";

const updateBandwidth = async (ip, bandwidth) => {
    try {
        // Find a user whose `ipAddresses` array contains the given IP
        const existingUser = await User.findOne({ ipAddresses: ip });

        if (!existingUser) {
            // If no user found, create a new one with `ipAddresses` as an array
            const newUser = new User({
                ipAddresses: [ip], // Store IP inside an array
                bandwidthUsed: bandwidth
            });
            await newUser.save();
        } else {
            // If user exists, update bandwidth
            existingUser.bandwidthUsed += bandwidth;
            await existingUser.save();
        }
    } catch (error) {
        console.error("Error updating bandwidth:", error);
    }
};

export default updateBandwidth;
