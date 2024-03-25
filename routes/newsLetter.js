import express from "express";
import {
    createNewsletter,
    updateNewsletter,
    deleteNewsletter,
    getAllNewsletters,
} from "../controllers/newsLetterController.js";

const router = express.Router();


router.post("/", createNewsletter);
router.put("/:id", updateNewsletter);
router.delete("/:id", deleteNewsletter);
router.get("/", getAllNewsletters);

export default router;