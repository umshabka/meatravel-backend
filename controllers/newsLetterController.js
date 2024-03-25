import NewsLetter from "../models/NewsLetter.js";

// Create a new Newsletter
export const createNewsletter = async (req, res) => {
  try {
    const newsletter = await NewsLetter.create(req.body);
    res.status(201).json(newsletter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Newsletters
export const getAllNewsletters = async (req, res) => {
  try {
    const newsletters = await NewsLetter.find();
    res.status(200).json(newsletters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Newsletter
export const updateNewsletter = async (req, res) => {
  try {
    const newsletter = await NewsLetter.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!newsletter) {
      return res.status(404).json({ message: "Newsletter not found" });
    }
    res.status(200).json(newsletter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Newsletter
export const deleteNewsletter = async (req, res) => {
  try {
    const newsletter = await NewsLetter.findByIdAndDelete(req.params.id);
    if (!newsletter) {
      return res.status(404).json({ message: "Newsletter not found" });
    }
    res.status(200).json({ message: "Newsletter deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
