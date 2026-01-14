import express from "express";

import auth from "../middleware/auth.middleware.js";

import {
  createGig,
  getGigs,
  getGigById
} from "../controllers/gig.controller.js";

const router = express.Router();

router.get("/", getGigs);
router.post("/", auth, createGig);
router.get("/:id", getGigById);


export default router;