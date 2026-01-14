import express from "express";
import auth from "../middleware/auth.middleware.js";
import { hireBid } from "../controllers/hire.controller.js";

const router = express.Router();

router.patch("/:bidId/hire", auth, hireBid);

export default router;