import express from "express";
import { createReview, getAllReviews } from "../controllers/reviewController.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/:tourId", verifyUser, createReview);
router.get("/", getAllReviews);

export default router;
