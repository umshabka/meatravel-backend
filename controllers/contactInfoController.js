import ContactInfo from "../models/ContactInfo.js";

const createContactInfo = async (req, res) => {
  const { phone, email, showInHomePage } = req.body;

  try {
    const newContactInfo = new ContactInfo({
      phone,
      email,
      showInHomePage
    });

    const createdContactInfo = await newContactInfo.save();

    res.status(201).json(createdContactInfo);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateContactInfo = async (req, res) => {
  const { id } = req.params;
  const { phone, email, showInHomePage } = req.body;

  try {
    const existingContactInfo = await ContactInfo.findById(id);
    if (!existingContactInfo) {
      return res.status(404).json({ message: 'Contact information not found' });
    }

    existingContactInfo.phone = phone;
    existingContactInfo.email = email;
    existingContactInfo.showInHomePage = showInHomePage;
    const updatedContactInfo = await existingContactInfo.save();

    res.status(200).json(updatedContactInfo);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getAllContactInfo = async (req, res) => {
  try {
    const allContactInfo = await ContactInfo.find();
    res.status(200).json(allContactInfo);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getContactInfo = async (req, res) => {
  const { id } = req.params;

  try {
    const contactInfo = await ContactInfo.findById(id);
    if (!contactInfo) {
      return res.status(404).json({ message: 'Contact information not found' });
    }

    res.status(200).json(contactInfo);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const deleteContactInfo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedContactInfo = await ContactInfo.findByIdAndDelete(id);
    if (!deletedContactInfo) {
      return res.status(404).json({ message: 'Contact information not found' });
    }

    res.status(200).json({ message: 'Contact information deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export { createContactInfo, updateContactInfo, getContactInfo, getAllContactInfo, deleteContactInfo };
