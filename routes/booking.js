import express from "express";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import {
  createBooking,
  getAllBooking,
  getBooking,
  daleteBooking
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", verifyUser, createBooking);
router.get("/:id", verifyUser, getBooking);
// router.get("/", verifyAdmin, getAllBooking);

router.get("/", getAllBooking);

router.delete("/:id", daleteBooking);

export default router;
