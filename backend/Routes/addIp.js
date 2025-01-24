import Ip from "../Db/ipAddress.js";
import User from "../Db/userSchema.js";

const addIp = async (req, res) => {
  const { ipAddress } = req.body;
    const email = req.user.email
    console.log(email)
  if (!ipAddress) {
    return res.status(400).json({ message: "IP address is required" });
  }
  try {
    // Check if the IP already exists in the database
    let existingIp = await Ip.findOne({ ipAddress });

    if (!existingIp) {
      // Find a user associated with the IP address (if applicable)
      const associatedUser = await User.findOne({ email}); // Ensure `User` has `ipAddress` field
      associatedUser.ipAddress=ipAddress
      await associatedUser.save()
      // Create a new IP document
      const newIp = new Ip({
        ipAddress: ipAddress,
        valid: true,
        user: associatedUser ? associatedUser._id : null, // Save only the user ID
      });


      // Save the new IP document
      await newIp.save();
      return res.status(201).json({ message: "IP address added successfully" });
    } else {
      return res.status(200).json({ message: "IP address already exists" });
    }
  } catch (error) {
    console.error("Error adding IP address:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default addIp;
