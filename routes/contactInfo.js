import express from "express";
import {
  updateContactInfo,
  getContactInfo,
  createContactInfo,
  getAllContactInfo
} from "../controllers/contactInfoController.js";

const router = express.Router();

router.post("/", createContactInfo);
router.put("/:id", updateContactInfo);
router.get("/:id", getContactInfo);
router.get("/", getAllContactInfo);

export default router;
