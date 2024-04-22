import express from "express";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import {
  createBooking,
  getAllBooking,
  getBooking,
  daleteBooking,
  downloadBookingsExcel
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/",  createBooking);
router.get('/downloadExcelSheet', downloadBookingsExcel);
// router.get("/:id", verifyUser, getBooking);
router.get("/:id", getBooking);
// router.get("/", verifyAdmin, getAllBooking);
router.get("/", getAllBooking);
router.delete("/:id", daleteBooking);



export default router;
