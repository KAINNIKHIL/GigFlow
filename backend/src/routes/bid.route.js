import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  createBid,
  getBidsForGig
} from "../controllers/bid.controller.js";

const router = express.Router();

router.post("/", auth, createBid);                 
router.get("/:gigId", auth, getBidsForGig);       

export default router;
