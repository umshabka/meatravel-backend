import express from "express";
import { createReview, getAllReviews, daleteReview, addReply, getSingleReview } from "../controllers/reviewController.js";
import { verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/:tourId", verifyUser, createReview);
router.get("/", getAllReviews);
router.delete("/:id", daleteReview);
router.put("/:id", addReply)
router.get("/:id", getSingleReview)

export default router;
