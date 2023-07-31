const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

// Define the Customer schema
const customerSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  is_staff: {
    type: Boolean,
    default: false,
  },
  is_active: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

// Hash the user password before saving
customerSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

// Create the Customer model
const Customer = mongoose.model("Customer", customerSchema);

// Define the JobSeeker schema
const jobSeekerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  email: {
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
    ref: "Customer",
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
module.exports = { Customer, Address, JobSeeker };
