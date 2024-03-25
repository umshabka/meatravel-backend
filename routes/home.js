import express from "express";
import {
    createHomeInfo,
    updateHomeInfo,
    deleteHomeInfo,
    getAllHomeInfo,
} from "../controllers/homeController.js";

const router = express.Router();


router.post("/", createHomeInfo);
router.put("/:id", updateHomeInfo);
router.delete("/:id", deleteHomeInfo);
router.get("/", getAllHomeInfo);

export default router;