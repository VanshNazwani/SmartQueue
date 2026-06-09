import mongoose, { Schema, Document } from 'mongoose';
import { Branch as IBranch } from '@/types';

interface BranchDocument extends Document, Omit<IBranch, 'id'> {}

const branchSchema = new Schema<BranchDocument>({
  name: { type: String, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  latitude: Number,
  longitude: Number,
  radius: { type: Number, default: 500 }, // meters
  operatingHours: {
    open: { type: String, required: true },
    close: { type: String, required: true },
  },
  counters: [{ type: Schema.Types.ObjectId, ref: 'Counter' }],
  staff: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Branch = mongoose.model<BranchDocument>('Branch', branchSchema);
