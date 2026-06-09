import mongoose, { Schema, Document } from 'mongoose';
import { Token as IToken } from '@/types';

interface TokenDocument extends Document, Omit<IToken, 'id'> {}

const tokenSchema = new Schema<TokenDocument>({
  tokenNumber: { type: String, required: true, unique: true },
  branchId: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
  counterId: { type: Schema.Types.ObjectId, ref: 'Counter' },
  customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['waiting', 'reserved', 'called', 'serving', 'served', 'cancelled', 'no_show'],
    default: 'waiting',
  },
  priority: {
    type: String,
    enum: ['normal', 'senior', 'emergency', 'premium', 'vip'],
    default: 'normal',
  },
  estimatedWaitTime: { type: Number, default: 0 },
  estimatedServiceTime: { type: Number, default: 0 },
  actualWaitTime: Number,
  actualServiceTime: Number,
  issueTime: { type: Date, required: true },
  calledTime: Date,
  servedTime: Date,
  qrCode: String,
  reservationId: { type: Schema.Types.ObjectId, ref: 'Reservation' },
  geolocationVerified: { type: Boolean, default: false },
  abandonmentRisk: String,
  abandonmentProbability: { type: Number, min: 0, max: 100 },
  serviceRating: { type: Number, min: 1, max: 5 },
  feedback: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Token = mongoose.model<TokenDocument>('Token', tokenSchema);
