import express from "express";
import {
  createUser,
  updateUser,
  daleteUser,
  getSingleUser,
  getAllUser,
  sendVerificationCodeByEmail,
  changePassword
} from "../controllers/userController.js";

const router = express.Router();

import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

//Create new user
// router.post("/", createUser);

//Update user
// router.put("/:id", verifyUser, updateUser);
router.put("/:id", updateUser);

//Delete user
// router.delete("/:id",verifyUser, daleteUser);
router.delete("/:id", daleteUser);

//Get user
// router.get("/:id", verifyUser, getSingleUser);
router.get("/:id", getSingleUser);

//get all user
// router.get("/", verifyAdmin, getAllUser);
router.get("/", getAllUser);


router.post("/sendVerificationCodeByEmail", sendVerificationCodeByEmail);
router.post("/changePassword", changePassword);

export default router;
