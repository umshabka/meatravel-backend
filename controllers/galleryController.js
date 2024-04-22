// controllers/galleryController.js
import Gallery from "../models/Gallery.js";

// Create a new image
export const createImage = async (req, res) => {
  try {
    const gallery = await Gallery.create(req.body);
    res.status(201).json({ success: true, data: gallery });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all images
export const getAllImages = async (req, res) => {
  try {
    const images = await Gallery.find();
    res.status(200).json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update an image
export const updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedImage = await Gallery.findByIdAndUpdate(id, req.body, {
      new: true
    });
    res.status(200).json({ success: true, data: updatedImage });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete an image
export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    await Gallery.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Delete all images
export const deleteAllImages = async (req, res) => {
  try {
    await Gallery.deleteMany({});
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Create multiple images with some data
export const createMultipleImages = async (req, res) => {
  try {
    const defaultImages = [
      {  image: 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg' },
      { image: 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg' },
      {  image: 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg' },
      {  image: 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg' },
      {  image: 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg' },
      {  image: 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg' },
      {  image: 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg' },
      {  image: 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg' },
    ];

    const images = await Gallery.insertMany(defaultImages);
    res.status(201).json({ success: true, data: images });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};