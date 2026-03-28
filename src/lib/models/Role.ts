import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IRole extends Document {
  name: string;
  slug: string;
  description?: string;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

const RoleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String },
    permissions: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Role: Model<IRole> =
  mongoose.models.Role || mongoose.model<IRole>('Role', RoleSchema);

export default Role;
