import mongoose, { Schema, Document } from 'mongoose';
import { Notification as INotification } from '@/types';

interface NotificationDocument extends Document, Omit<INotification, 'id'> {}

const notificationSchema = new Schema<NotificationDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: {
    type: String,
    enum: [
      'token_generated',
      'turn_approaching',
      'counter_changed',
      'queue_delayed',
      'service_completed',
    ],
    required: true,
  },
  channels: [
    {
      type: String,
      enum: ['push', 'email', 'sms', 'whatsapp'],
    },
  ],
  title: { type: String, required: true },
  message: { type: String, required: true },
  data: Schema.Types.Mixed,
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Notification = mongoose.model<NotificationDocument>('Notification', notificationSchema);
