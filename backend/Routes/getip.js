import Ip from "../Db/ipAddress.js";
import User from "../Db/userSchema.js";

const getUserIpsAndBandwidth = async (req, res) => {
  try {
    const email = req.user.email;
    console.log("Fetching IPs for:", email);

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find all IP addresses associated with this user

   const ips = user.ipAddresses

    // Extract IP addresses
   
    // Calculate total bandwidth
    const totalBandwidth = Math.floor(user.bandwidthUsed/1024)

    return res.status(200).json({ ips, totalBandwidth });
  } catch (error) {
    console.error("Error fetching IPs:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default getUserIpsAndBandwidth;
