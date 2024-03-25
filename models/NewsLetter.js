import mongoose from "mongoose";

const NewsLetterSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            default: 'Subscribe now to get useful travelling information.'
          },
        desc: {
            type: String,
            required: true,
            unique: true,
            default: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit inventore nihil ea suscipit. Consectetur, vel.'
          }
    },
    { timestamps: true }
);

export default mongoose.model("NewsLetter", NewsLetterSchema);
