import express from "express";
import {
  createUser,
  updateUser,
  daleteUser,
  getSingleUser,
  getAllUser,
} from "../controllers/userController.js";

const router = express.Router();

import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

//Create new user
// router.post("/", createUser);

//Update user
router.put("/:id", verifyUser, updateUser);

//Delete user
// router.delete("/:id",verifyUser, daleteUser);
router.delete("/:id", daleteUser);

//Create new user
router.get("/:id", verifyUser, getSingleUser);

//get all user
// router.get("/", verifyAdmin, getAllUser);
router.get("/", getAllUser);

export default router;
