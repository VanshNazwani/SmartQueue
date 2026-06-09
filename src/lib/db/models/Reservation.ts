import mongoose, { Schema, Document } from 'mongoose';
import { Reservation as IReservation } from '@/types';

interface ReservationDocument extends Document, Omit<IReservation, 'id'> {}

const reservationSchema = new Schema<ReservationDocument>({
  customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  branchId: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
  counterId: { type: Schema.Types.ObjectId, ref: 'Counter' },
  reservedDate: { type: Date, required: true },
  reservedTimeSlot: {
    start: { type: String, required: true },
    end: { type: String, required: true },
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  },
  allocatedTokenId: { type: Schema.Types.ObjectId, ref: 'Token' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Reservation = mongoose.model<ReservationDocument>('Reservation', reservationSchema);
