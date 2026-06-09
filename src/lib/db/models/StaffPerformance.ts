import mongoose, { Schema, Document } from 'mongoose';
import { StaffPerformance as IStaffPerformance } from '@/types';

interface StaffPerformanceDocument extends Document, Omit<IStaffPerformance, 'id'> {}

const staffPerformanceSchema = new Schema<StaffPerformanceDocument>({
  staffId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  branchId: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
  date: { type: Date, default: Date.now },
  tokensServed: { type: Number, default: 0 },
  averageServiceTime: { type: Number, default: 0 },
  customerSatisfaction: { type: Number, default: 0, min: 0, max: 5 },
  completedTasks: { type: Number, default: 0 },
  missedTasks: { type: Number, default: 0 },
});

export const StaffPerformance = mongoose.model<StaffPerformanceDocument>(
  'StaffPerformance',
  staffPerformanceSchema
);
