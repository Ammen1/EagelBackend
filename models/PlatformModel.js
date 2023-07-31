const mongoose = require("mongoose");
const { Schema } = mongoose;
const slugify = require("slugify");
const { v4: uuidv4 } = require("uuid");

// Define the Category schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  is_active: {
    type: Boolean,
    default: true,
  },
});

// Generate the slug from the name and append a unique identifier if needed
categorySchema.pre("save", function (next) {
  const category = this;
  if (!category.slug) {
    const baseSlug = slugify(category.name);
    let uniqueId = 1;
    const generateUniqueSlug = async () => {
      const slug = uniqueId === 1 ? baseSlug : `${baseSlug}-${uniqueId}`;
      const existingCategory = await mongoose.models.Category.findOne({
        slug: slug,
      });
      if (!existingCategory) {
        category.slug = slug;
        return next();
      }
      uniqueId++;
      generateUniqueSlug();
    };
    generateUniqueSlug();
  } else {
    next();
  }
});

// Create the Category model
const Category = mongoose.model("Category", categorySchema);

// Define the JobType schema
const jobTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
});

// Create the JobType model
const JobType = mongoose.model("JobType", jobTypeSchema);

// Define the Job schema
const jobSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  jobtype: {
    type: Schema.Types.ObjectId,
    ref: "JobType",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    max_length: 100,
    default: null,
  },
  is_active: {
    type: Boolean,
    default: false,
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

// Generate the slug from the title and append a unique identifier if needed
jobSchema.pre("save", function (next) {
  const job = this;
  if (!job.slug) {
    const baseSlug = slugify(job.title);
    let uniqueId = 1;
    const generateUniqueSlug = async () => {
      const slug = uniqueId === 1 ? baseSlug : `${baseSlug}-${uniqueId}`;
      const existingJob = await mongoose.models.Job.findOne({ slug: slug });
      if (!existingJob) {
        job.slug = slug;
        return next();
      }
      uniqueId++;
      generateUniqueSlug();
    };
    generateUniqueSlug();
  } else {
    next();
  }
});

// Create the Job model
const Job = mongoose.model("Job", jobSchema);

// Define the JobImage schema
const jobImageSchema = new Schema({
  job: {
    type: Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  alt_text: {
    type: String,
    max_length: 255,
    default: null,
  },
  is_feature: {
    type: Boolean,
    default: false,
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

// Create the JobImage model
const JobImage = mongoose.model("JobImage", jobImageSchema);

// Define the Company schema
const companySchema = new Schema({
  company_name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: false,
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

// Create the Company model
const Company = mongoose.model("Company", companySchema);

// Define the CompanyUserProfile schema
const companyUserProfileSchema = new Schema({
  company_name: {
    type: Schema.Types.ObjectId,
    ref: "Company",
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
  phone_number: {
    type: String,
    max_length: 15,
  },
  avatar: {
    type: String,
    default: "avatar.svg",
  },
  location: {
    type: String,
    required: true,
  },
});

// Create the CompanyUserProfile model
const CompanyUserProfile = mongoose.model(
  "CompanyUserProfile",
  companyUserProfileSchema
);

const feedbackSchema = new Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
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
  _id: {
    type: String,
    default: uuidv4,
  },
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
  _id: {
    type: String,
    default: uuidv4,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
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

const jobApplicationSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 }, // Use UUID as the primary key
  jobSeeker: { type: mongoose.Schema.Types.ObjectId, ref: "JobSeeker" },
  jobListing: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  resume: { type: String }, // Store the path to the resume file in the server
  coverLetter: { type: String },
  appliedDate: { type: Date, default: Date.now },
  isAccepted: { type: Boolean, default: false },
  isInterviewInvited: { type: Boolean, default: false },
});

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

// Export the models to use them in other parts of your application
module.exports = {
  Category,
  JobType,
  Job,
  JobImage,
  Company,
  CompanyUserProfile,
  FeedBack,
  Message,
  Review,
  Notification,
  JobApplication,
};
