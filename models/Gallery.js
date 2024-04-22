// models/galleryModel.js
import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  image: { type: String }
});

export default mongoose.model("Gallery", gallerySchema);
