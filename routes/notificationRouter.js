import express from "express";
import {
  createNotification,
  getAllNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
} from "../controllers/notificationController.js"; // Adjust the import path based on your project structure

const router = express.Router();

// Routes for notifications
router.post("/notification", createNotification);
router.get("/notification", getAllNotifications);
router.get("/notification/:id", getNotificationById);
router.put("/notification/:id", updateNotification);
router.delete("/notification/:id", deleteNotification);

export default router;
