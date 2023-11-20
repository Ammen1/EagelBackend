import mongoose from "mongoose";
const { Schema } = mongoose;
import { v4 as uuidv4 } from "uuid";

const feedbackSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  feedback_reply: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Create the FeedBack model
const FeedBack = mongoose.model("FeedBack", feedbackSchema);

// Define the Message schema
const messageSchema = new Schema({
  // _id: {
  //   type: String,
  //   default: uuidv4,
  // },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  message_reply: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Create the Message model
const Message = mongoose.model("Message", messageSchema);

// Define the Notification schema
const notificationSchema = new Schema({
  // user_id: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Customer",
  //   required: true,
  // },
  message: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Create the Notification model
const Notification = mongoose.model("Notification", notificationSchema);

// Define the Review schema
const reviewSchema = new Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  job_seeker: {
    type: Schema.Types.ObjectId,
    ref: "JobSeeker",
    required: true,
  },
  review_text: {
    type: String,
    required: true,
  },
  date_submitted: {
    type: Date,
    default: Date.now,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Create the Review model
const Review = mongoose.model("Review", reviewSchema);

// Export the models to use them in other parts of your application
export { FeedBack, Message, Review, Notification };
