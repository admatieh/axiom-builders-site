import mongoose, { Schema } from 'mongoose';

const PageContentSchema = new Schema(
  {
    slug: {
      type: String,
      required: [true, 'Please provide a slug for this page.'],
      unique: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a title for this page.'],
    },
    status: {
      type: String,
      default: 'published',
      enum: ['published', 'draft', 'archived'],
    },
    sections: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.PageContent || mongoose.model('PageContent', PageContentSchema);
