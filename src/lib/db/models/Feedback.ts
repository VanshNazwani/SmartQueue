import mongoose, { Schema, Document } from 'mongoose';
import { Feedback as IFeedback } from '@/types';

interface FeedbackDocument extends Document, Omit<IFeedback, 'id'> {}

const feedbackSchema = new Schema<FeedbackDocument>({
  tokenId: { type: Schema.Types.ObjectId, ref: 'Token', required: true },
  customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  branchId: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  feedback: { type: String, required: true },
  sentiment: {
    type: String,
    enum: ['positive', 'neutral', 'negative'],
  },
  sentimentScore: { type: Number, min: 0, max: 1 },
  categories: [String],
  createdAt: { type: Date, default: Date.now },
});

export const Feedback = mongoose.model<FeedbackDocument>('Feedback', feedbackSchema);
