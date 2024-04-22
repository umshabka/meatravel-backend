import express from "express";
import {
  createImage,
  getAllImages,
  updateImage,
  deleteImage,
  createMultipleImages,
  deleteAllImages
} from "../controllers/galleryController.js";

const router = express.Router();

router.post("/",  createImage);
router.get("/",  getAllImages);
router.put("/:id", updateImage);
router.delete("/:id", deleteImage);

router.post("/default", createMultipleImages);
router.delete("/", deleteAllImages);

export default router;
