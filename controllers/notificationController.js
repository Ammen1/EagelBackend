import asyncHandler from "express-async-handler";
import { Notification } from "../models/PlatformModel.js"; // Adjust the import path based on your project structure

// Controller function to create a new notification
// export const createNotification = asyncHandler(async (req, res) => {
//   try {
//     const { user_id, message } = req.body
//     const newNotification = new Notification({ user_id, message });
//     const savedMessage = new newNotification.save();
//     res.status(201).json({ success: true, data: savedMessage });
//   } catch(error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

export const createNotification = asyncHandler(async (req, res) => {
  try {
    const { message } = req.body;
    const newNotification = new Notification({ message });
    const savedNotification = await newNotification.save();
    res.status(201).json({ success: true, data: savedNotification });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
// Controller function to get all notifications
export const getAllNotifications = asyncHandler(async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
// Controller function to get a specific notification by ID
export const getNotificationById = asyncHandler(async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res
        .status(404)
        .json({ success: false, error: "Notification Not Foud...!" });
    }
    res.status(200).json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Controller function to update a notification by ID
export const updateNotification = asyncHandler(async (req, res) => {
  try {
    const notificationId = req.params.id;
    const { message } = req.body;
    const updatedNotification = await Notification.findByIdAndUpdate(
      notificationId,
      {
        message,
        updated_at: Date.now(),
      },
      { new: true }
    );
    if (!updatedNotification) {
      return res
        .status(404)
        .json({ success: true, error: "Notification Not Found...!" });
    }
    res.status(200).json({ success: true, data: updatedNotification });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Controller function to delete a notification by ID
export const deleteNotification = asyncHandler(async (req, res) => {
  try {
    const notificationId = req.params.id;
    const deletedNotification = await Notification.findByIdAndDelete(
      notificationId
    );
    if (!deletedNotification) {
      return res
        .status(404)
        .json({ success: false, error: "Notification Not Found...!" });
    }
    res.status(200).json({ success: true, data: deletedNotification });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
