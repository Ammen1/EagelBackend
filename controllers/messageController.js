import asyncHandler from "express-async-handler";
import { Message } from "../models/PlatformModel.js"; // Adjust the import path based on your project structure

// Controller function to create a new message
const createMessage = asyncHandler(async (req, res) => {
  try {
    const { message, message_reply } = req.body;
    const newMessage = new Message({ message, message_reply });
    const savedMessage = await newMessage.save();
    res.status(201).json({ success: true, data: savedMessage });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// const createMessage = async (req, res) => {
//   try {
//     const { message, message_reply } = req.body;
//     const newMessage = new Message({ message, message_reply });
//     const savedMessage = await newMessage.save();
//     res.status(201).json({ success: true, data: savedMessage });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

// Controller function to get all messages
const getAllMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.messages });
  }
});

// Controller function to get a specific message by ID
const getMessageById = asyncHandler(async (req, res) => {
  try {
    const messageId = req.params.id;
    const getmessageById = await Message.findById(messageId);
    if (getmessageById) {
      return res
        .status(404)
        .json({ success: false, error: "Message Not Found...!" });
    }
    res.status(200).json({ success: true, data: getmessageById });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
// Controller function to update a message by ID
const updateMessage = asyncHandler(async (req, res) => {
  try {
    const messageId = req.params.id;
    const { user_id, message, message_reply } = req.body;
    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { user_id, message, message_reply, updated_at: Date.now() },
      { new: true }
    );
    if (!updatedMessage) {
      return res
        .status(404)
        .json({ success: false, error: "Message Not Found...!" });
    }
    res.status(200).json({ success: true, data: updatedMessage });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Controller function to delete a message by ID
const deleteMessage = asyncHandler(async (req, res) => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(req.params.id);
    if (!deletedMessage) {
      return res
        .status(404)
        .json({ success: false, error: "Message Not Found" });
    }
    res.status(200).json({ success: true, data: deletedMessage });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export {
  createMessage,
  getAllMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
};
