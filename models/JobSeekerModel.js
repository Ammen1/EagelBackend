import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the JobSeeker schema
const jobSeekerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
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
  },
  avatar: {
    type: String,
    default: "avatar.svg",
  },
  qualifications: {
    type: String,
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
  phone: {
    type: String,
  },
  town_city: {
    type: String,
  },
});

// Create the Address model
const Address = mongoose.model("Address", addressSchema);

// Export the models to use them in other parts of your application
export { JobSeeker, Address };
