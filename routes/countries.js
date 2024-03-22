import express from "express";
import {
    createCountry,
    updateCountry,
    deleteCountry,
    getAllCountries,
    getCountryByName,
    getCountryById
} from "../controllers/countriesController.js";

const router = express.Router();


router.post("/", createCountry);
router.put("/:id", updateCountry);
router.delete("/:id", deleteCountry);
router.get("/:countryName", getCountryByName);
router.get("/id/:id", getCountryById);
router.get("/", getAllCountries);

export default router;

