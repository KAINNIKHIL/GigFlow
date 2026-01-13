import express from "express";
import auth from "../middleware/auth.middleware";
import { hireBid } from "../controllers/hire.controller";

const router = express.Router();

router.patch("/:bidId/hire", auth, hireBid);

export default router;