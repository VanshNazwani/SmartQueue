import mongoose, { Schema, Document } from 'mongoose';
import { BranchAnalytics as IBranchAnalytics } from '@/types';

interface BranchAnalyticsDocument extends Document, Omit<IBranchAnalytics, undefined> {}

const branchAnalyticsSchema = new Schema<BranchAnalyticsDocument>({
  branchId: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
  date: { type: Date, default: Date.now },
  dailyCustomers: { type: Number, default: 0 },
  averageWaitTime: { type: Number, default: 0 },
  averageServiceTime: { type: Number, default: 0 },
  noShowCount: { type: Number, default: 0 },
  satisfactionScore: { type: Number, default: 0, min: 0, max: 5 },
  staffUtilization: { type: Number, default: 0, min: 0, max: 100 },
  peakHours: [String],
});

export const BranchAnalytics = mongoose.model<BranchAnalyticsDocument>(
  'BranchAnalytics',
  branchAnalyticsSchema
);
