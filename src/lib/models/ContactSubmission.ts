import mongoose, { Schema } from 'mongoose';

const ContactSubmissionSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please provide your full name.'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide a valid email address.'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    phone: {
      type: String,
      required: [true, 'Please provide a phone number.'],
      trim: true,
    },
    projectType: {
      type: String,
      required: [true, 'Please select a project type.'],
      enum: ['Commercial', 'Residential', 'Mixed-Use', 'Institutional', 'Other'],
    },
    subject: {
      type: String,
      required: [true, 'Please provide a subject line.'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Please provide a message.'],
      trim: true,
    },
    status: {
      type: String,
      default: 'new',
      enum: ['new', 'read', 'archived', 'replied'],
    },
    sourcePage: {
      type: String,
      default: 'contact',
    },
    approximateLocation: {
      ip: String,
      city: String,
      region: String,
      country: String,
      userAgent: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.ContactSubmission ||
  mongoose.model('ContactSubmission', ContactSubmissionSchema);
