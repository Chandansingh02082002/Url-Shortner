import express from "express";
import {
  createLink,
  listLinks,
  getStats,
  deleteLink,
  redirect
} from "../controllers/linksController.js";

const router = express.Router();

router.post("/", createLink);
router.get("/", listLinks);
router.get("/:code", getStats);
router.delete("/:code", deleteLink);

export default router;
