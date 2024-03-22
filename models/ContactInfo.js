import mongoose from "mongoose";

const contactInfoSchema = new mongoose.Schema(
    {
        phone: {
            type: Number,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("ContactInfo", contactInfoSchema);
