import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    ipAddress: {
      type: String,
       // Ensure the IP address is provided
      validate: {
        validator: function(value) {
          // Simple IP address validation using regex (IPv4 only)
          return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value);
        },
        message: 'Invalid IP address format'
      }
    },
    bandwidthUsed: {
      type: Number,
      default: 0, // Default to 0 if not provided
      min: [0, 'Bandwidth used cannot be negative']
    }
    ,
    email:{
      type:String,
      required:true,
    },
    password:{
      type:String,
      required:true
    }
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Create a model from the schema
const User = mongoose.model('User', userSchema);

export default User;
