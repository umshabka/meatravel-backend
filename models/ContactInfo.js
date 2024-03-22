import mongoose from "mongoose";

const contactInfoSchema = new mongoose.Schema(
    {
        phone: {
            type: String,
            required: false,
            unique: true,
        },
        email: {
            type: String,
            required: false,
            unique: false,
        },
        showInHomePage:{
            type: Boolean,
            required: true,
            default: false,
        }
    },
    { timestamps: true }
);

export default mongoose.model("ContactInfo", contactInfoSchema);
