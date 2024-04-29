import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    photo: {
      type: String,
      default: "http://res.cloudinary.com/dgswngo1l/image/upload/v1714252409/upload/hdjhnqstnxotb1p5tuwt.jpg"
    },

    role: {
      type: String,
      default: "user",
    },
    accountType: {
      type: String,
      default: 'Individual',
    },
    travelAgent_Verification: {
      type: Boolean,
      default: false,
    },
    is_email_verified: {
      type: Boolean,
      default: false,
    },
    email_verification_code: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
