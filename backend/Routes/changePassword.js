const changePassword = async (req, res) => {
    const { email, currentPassword, newPassword } = req.body; // Destructure email, currentPassword, and newPassword from the request body
  
    if (!email || !currentPassword || !newPassword) {
      return res.status(400).json({ message: "Email, current password, and new password are required" });
    }
  
    try {
      // Check if the email exists in the database
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        return res.status(400).json({ message: "User not found" });
      }
  
      // Compare the current password with the hashed password
      const isPasswordValid = await bcrypt.compare(currentPassword, existingUser.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }
  
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);
  
      // Update the user's password
      existingUser.password = hashedNewPassword;
      await existingUser.save();
  
      // Respond with success message
      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  };
export default changePassword