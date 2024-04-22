import express from "express";
import {
    createNewsLetterEmail,
    updateNewsLetterEmail,
    deleteNewsLetterEmail,
    getAllNewsLetterEmails,
    getNewsLetterEmailById
} from "../controllers/NewsLetterEmailsController.js";

const router = express.Router();


router.post("/", createNewsLetterEmail);
router.put("/:id", updateNewsLetterEmail);
router.delete("/:id", deleteNewsLetterEmail);
router.get("/", getAllNewsLetterEmails);
router.get("/:id", getNewsLetterEmailById);

export default router;