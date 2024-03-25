import HomeInfo from "../models/HomeInfo.js";

// Create a new HomeInfo
export const createHomeInfo = async (req, res) => {
  try {
    const homeInfo = await HomeInfo.create(req.body);
    res.status(201).json(homeInfo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all HomeInfo
export const getAllHomeInfo = async (req, res) => {
  try {
    const homeInfo = await HomeInfo.find();
    res.status(200).json(homeInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a HomeInfo
export const updateHomeInfo = async (req, res) => {
  try {
    const homeInfo = await HomeInfo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!homeInfo) {
      return res.status(404).json({ message: "HomeInfo not found" });
    }
    res.status(200).json(homeInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a HomeInfo
export const deleteHomeInfo = async (req, res) => {
  try {
    const homeInfo = await HomeInfo.findByIdAndDelete(req.params.id);
    if (!homeInfo) {
      return res.status(404).json({ message: "HomeInfo not found" });
    }
    res.status(200).json({ message: "HomeInfo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};