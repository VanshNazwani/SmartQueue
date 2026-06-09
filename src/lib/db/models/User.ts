import mongoose, { Schema, Document } from 'mongoose';
import { User as IUser } from '@/types';

interface UserDocument extends Document, Omit<IUser, 'id'> {}

const userSchema = new Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: {
    type: String,
    enum: ['super_admin', 'branch_admin', 'staff', 'customer'],
    required: true,
  },
  branchId: { type: Schema.Types.ObjectId, ref: 'Branch' },
  avatar: String,
  phoneNumber: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const User = mongoose.model<UserDocument>('User', userSchema);
