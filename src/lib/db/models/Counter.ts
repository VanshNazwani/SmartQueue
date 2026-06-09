import mongoose, { Schema, Document } from 'mongoose';
import { Counter as ICounter } from '@/types';

interface CounterDocument extends Document, Omit<ICounter, 'id'> {}

const counterSchema = new Schema<CounterDocument>({
  branchId: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  assignedStaff: { type: Schema.Types.ObjectId, ref: 'User' },
  status: {
    type: String,
    enum: ['available', 'busy', 'offline'],
    default: 'available',
  },
  currentTokenId: { type: Schema.Types.ObjectId, ref: 'Token' },
  averageServiceTime: { type: Number, default: 10 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Counter = mongoose.model<CounterDocument>('Counter', counterSchema);
