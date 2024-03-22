import express from "express";
import {
  createTour,
  updateTour,
  daleteTour,
  getSingleTour,
  getAllTour,
  getTourBySearch,
  getFeaturedTour,
  getTourCount,
} from "../controllers/tourController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//Create new tour
// router.post("/", verifyAdmin, createTour);
router.post("/", createTour);

//Update tour
//router.put("/:id", verifyAdmin, updateTour);
router.put("/:id", updateTour);

//Delete tour
// router.delete("/:id",verifyAdmin, daleteTour);
router.delete("/:id", daleteTour);

//Create new tour
router.get("/:id", getSingleTour);

//get all tour
router.get("/", getAllTour);

//get all tour
router.get("/search/getTourBySearch", getTourBySearch);

router.get("/search/getFeaturedTours", getFeaturedTour);

router.get("/search/getTourCount", getTourCount);

export default router;
