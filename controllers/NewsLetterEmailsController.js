import NewsLetterEmails from '../models/NewsLetterEmails.js';

// Create operation
export const createNewsLetterEmail = async (req, res) => {
    try {
      const email = await NewsLetterEmails.create(req.body);
      res.status(201).json(email);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

// Update operation
export const updateNewsLetterEmail = async (req, res) => {
    try {
      const updatedEmail = await NewsLetterEmails.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedEmail) {
        return res.status(404).json({ message: "Newsletter Email not found" });
      }
      res.status(200).json(updatedEmail);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Delete operation
export const deleteNewsLetterEmail = async (req, res) => {
    try {
      const email = await NewsLetterEmails.findByIdAndDelete(req.params.id);
      if (!email) {
        return res.status(404).json({ message: "email not found" });
      }
      res.status(200).json({ message: "email deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Get all operation
export const getAllNewsLetterEmails = async (req, res) => {
    try {
      const emails = await NewsLetterEmails.find();
      res.status(200).json(emails);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Get single operation
export const getNewsLetterEmailById = async (req, res) => {
    const id = req.params.id;
    try {
      const email = await NewsLetterEmails.findById(id);
      res.status(200).json({
        success: true, message: "Found Successfully", data: email,
      });
    } catch (error) {
      res.status(404).json({
        success: false, message: "Not Found",
      });
    }
  };