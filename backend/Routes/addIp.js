import Ip from "../Db/ipAddress.js";
import User from "../Db/userSchema.js";

const addIp = async (req, res) => {
  let ip = req.socket.remoteAddress; // Get IP from socket

  // Convert IPv4-mapped IPv6 (::ffff:x.x.x.x) to standard IPv4
  if (ip.startsWith("::ffff:")) {
    ip = ip.slice(7);
  } else if (ip === "::1" || ip === "localhost") {
    ip = "127.0.0.1"; // Convert local IPv6 to IPv4
  }

  console.log("Client IP:", ip);

  const email = req.user.email;
  console.log("User Email:", email);

  if (!ip) {
    return res.status(400).json({ message: "IP address is required" });
  }

  try {
    // Find the user associated with the email
    const associatedUser = await User.findOne({ email });

    if (!associatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure ipAddresses is an array (for safety)
    if (!Array.isArray(associatedUser.ipAddresses)) {
      associatedUser.ipAddresses = [];
    }

    // Check if the IP is already in the array
    if (associatedUser.ipAddresses.includes(ip)) {
      return res.status(409).json({ message: "IP address already exists for this user" });
    }

    // Add the new IP to the user's ipAddresses array and save
    associatedUser.ipAddresses.push(ip);
    await associatedUser.save();

    // Save IP in the Ip collection with reference to the user
    const newIp = new Ip({
      ipAddress: ip,
      valid: true,
      user: associatedUser._id, // Store user reference
    });

    await newIp.save();

    return res.status(201).json({ message: "IP address added successfully" });

  } catch (error) {
    console.error("Error adding IP address:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default addIp;
