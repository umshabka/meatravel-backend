import mongoose from "mongoose";

const NewsLetterEmailsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("NewsLetterEmails", NewsLetterEmailsSchema);
