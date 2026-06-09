import mongoose, { Schema, Document } from 'mongoose';
import { Announcement as IAnnouncement } from '@/types';

interface AnnouncementDocument extends Document, Omit<IAnnouncement, 'id'> {}

const announcementSchema = new Schema<AnnouncementDocument>({
  branchId: { type: Schema.Types.ObjectId, ref: 'Branch', required: true },
  counterId: { type: Schema.Types.ObjectId, ref: 'Counter' },
  message: { type: String, required: true },
  language: { type: String, default: 'en' },
  priority: {
    type: String,
    enum: ['normal', 'urgent'],
    default: 'normal',
  },
  status: {
    type: String,
    enum: ['pending', 'announced', 'completed'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
  scheduledFor: Date,
});

export const Announcement = mongoose.model<AnnouncementDocument>('Announcement', announcementSchema);
