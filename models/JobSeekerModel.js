import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the JobSeeker schema
const jobSeekerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: "",
  },
  skills: {
    type: String,
    required: true,
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
  avatar: {
    type: String,
    default: "avatar.svg",
  },
  qualifications: {
    type: String,
    required: true,
  },
  notifications: [
    {
      type: Schema.Types.ObjectId,
      ref: "Notification",
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

// Create the JobSeeker model
const JobSeeker = mongoose.model("JobSeeker", jobSeekerSchema);

// Define the Address schema
const addressSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  phone: {
    type: String,
    required: true,
  },
  town_city: {
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
  default: {
    type: Boolean,
    default: false,
  },
});

// Create the Address model
const Address = mongoose.model("Address", addressSchema);

// Export the models to use them in other parts of your application
export { JobSeeker, Address };
