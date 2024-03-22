// import ContactInfo from '../models/contactInfo.js';

// const createContactInfo = async (req, res) => {
//   const { phone, email } = req.body;

//   try {
//     // Create a new contact information document
//     const newContactInfo = new ContactInfo({
//       phone,
//       email
//     });

//     // Save the new contact information to the database
//     const createdContactInfo = await newContactInfo.save();

//     // Send back the created contact information as response
//     res.status(201).json(createdContactInfo);
//   } catch (error) {
//     res.status(500).json({ message: 'Something went wrong' });
//   }
// };


// const updateContactInfo = async (req, res) => {
//   const { phone, email } = req.body;

//   try {
//     const existingContactInfo = await ContactInfo.findOne();
//     if (!existingContactInfo) {
//       return res.status(404).json({ message: 'Contact information not found' });
//     }

//     existingContactInfo.phone = phone;
//     existingContactInfo.email = email;
//     const updatedContactInfo = await existingContactInfo.save();

//     res.status(200).json(updatedContactInfo);
//   } catch (error) {
//     res.status(500).json({ message: 'Something went wrong' });
//   }
// };

// // get contact information 
// const getContactInfo = async (req, res) => {
//   try {
//     const contactInfo = await ContactInfo.findOne();
//     if (!contactInfo) {
//       return res.status(404).json({ message: 'Contact information not found' });
//     }

//     res.status(200).json(contactInfo);
//   } catch (error) {
//     res.status(500).json({ message: 'Something went wrong' });
//   }
// };


// export { createContactInfo, updateContactInfo, getContactInfo };


import ContactInfo from '../models/contactInfo.js';

const createContactInfo = async (req, res) => {
  const { phone, email } = req.body;

  try {
    const newContactInfo = new ContactInfo({
      phone,
      email
    });

    const createdContactInfo = await newContactInfo.save();

    res.status(201).json(createdContactInfo);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const updateContactInfo = async (req, res) => {
  const { id } = req.params;
  const { phone, email } = req.body;

  try {
    const existingContactInfo = await ContactInfo.findById(id);
    if (!existingContactInfo) {
      return res.status(404).json({ message: 'Contact information not found' });
    }

    existingContactInfo.phone = phone;
    existingContactInfo.email = email;
    const updatedContactInfo = await existingContactInfo.save();

    res.status(200).json(updatedContactInfo);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const getAllContactInfo = async (req, res) => {
  try {
    const allContactInfo = await ContactInfo.find();
    res.status(200).json(allContactInfo);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export { getAllContactInfo };
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

export { createContactInfo, updateContactInfo, getContactInfo };
