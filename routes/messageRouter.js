import express from "express";
import {
  createMessage,
  getAllMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
} from "../controllers/messageController.js"; // Adjust the import path based on your project structure

const router = express.Router();

// Routes for messages
router.post("/message", createMessage);
router.get("/message", getAllMessages);
router.get("/message/:id", getMessageById);
router.put("/message/:id", updateMessage);
router.delete("/message/:id", deleteMessage);

export default router;
