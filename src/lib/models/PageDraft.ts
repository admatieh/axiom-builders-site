import mongoose, { Schema } from 'mongoose';

const PageDraftSchema = new Schema(
  {
    slug: { 
      type: String, 
      required: true,
      index: true 
    },
    title: { 
      type: String, 
      required: true 
    },
    draftName: { 
      type: String, 
      default: function() {
        return `Draft - ${new Date().toLocaleString()}`;
      }
    },
    sections: { 
      type: Schema.Types.Mixed, 
      default: {} 
    },
  },
  { timestamps: true }
);

export default mongoose.models.PageDraft || mongoose.model('PageDraft', PageDraftSchema);
