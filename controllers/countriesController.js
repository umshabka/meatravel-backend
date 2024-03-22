import CountriesModel from "../models/Countries.js";

// Controller for creating a new country
export const createCountry = async (req, res) => {
  try {
    const { country, overview_pragraph1, overview_pragraph2 } = req.body;
    const newCountry = await CountriesModel.create({ country, overview_pragraph1, overview_pragraph2 });
    res.status(201).json(newCountry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for updating a country by ID
export const updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCountry = await CountriesModel.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedCountry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for deleting a country by ID
export const deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;
    await CountriesModel.findByIdAndDelete(id);
    res.json({ message: 'Country deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for getting all countries
export const getAllCountries = async (req, res) => {
  try {
    const countries = await CountriesModel.find();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for getting a single country by name
export const getCountryByName = async (req, res) => {
  try {
    const { countryName } = req.params;
    const country = await CountriesModel.findOne({ country: countryName });
    if (!country) {
      res.status(404).json({ message: 'Country not found' });
    } else {
      res.json(country);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for getting a single country by id
export const getCountryById = async (req, res) => {
  try {
    const { id } = req.params;
    const country = await CountriesModel.findById(id);
    if (!country) {
      res.status(404).json({ message: error.message });
    } else {
      res.json(country);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
