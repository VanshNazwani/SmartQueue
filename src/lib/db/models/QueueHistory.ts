import mongoose, { Schema, Document } from 'mongoose';
import { QueueHistory as IQueueHistory } from '@/types';

interface QueueHistoryDocument extends Document, Omit<IQueueHistory, 'id'> {}

const queueHistorySchema = new Schema<QueueHistoryDocument>({
  tokenId: { type: Schema.Types.ObjectId, ref: 'Token', required: true },
  timestamp: { type: Date, default: Date.now },
  action: { type: String, required: true },
  details: Schema.Types.Mixed,
});

export const QueueHistory = mongoose.model<QueueHistoryDocument>('QueueHistory', queueHistorySchema);
