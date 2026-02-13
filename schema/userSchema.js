import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    isVerified: {
      type: Boolean,
      default: false
    },

    otp: String,
    otpExpiry: Date
  },
  {
    timestamps: true,
    collection: "userauth"
  }
);

const userModel = mongoose.model("UserAuth", userSchema);
export default userModel;