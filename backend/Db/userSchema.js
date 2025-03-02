import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    ipAddresses: {
      type: [String], // Array of strings
      validate: {
        validator: function (values) {
          // Validate each IP address in the array
          return values.every((value) =>
            /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value)
          );
        },
        message: 'Invalid IP address format in array',
      },
    },
    bandwidthUsed: {
      type: Number,
      default: 0, // Default to 0 if not provided
      min: [0, 'Bandwidth used cannot be negative'],
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Create a model from the schema
const User = mongoose.model('User', userSchema);

export default User;
