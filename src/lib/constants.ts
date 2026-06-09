// Application Constants and Configuration

export const APP_NAME = 'SmartQueue 2.0';
export const APP_VERSION = '2.0.0';

// Token Configuration
export const TOKEN_STATUSES = {
  WAITING: 'waiting',
  RESERVED: 'reserved',
  CALLED: 'called',
  SERVING: 'serving',
  SERVED: 'served',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no_show',
} as const;

export const PRIORITY_LEVELS = {
  NORMAL: 'normal',
  SENIOR: 'senior',
  EMERGENCY: 'emergency',
  PREMIUM: 'premium',
  VIP: 'vip',
} as const;

export const RISK_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

export const SENTIMENT_TYPES = {
  POSITIVE: 'positive',
  NEUTRAL: 'neutral',
  NEGATIVE: 'negative',
} as const;

// User Roles
export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  BRANCH_ADMIN: 'branch_admin',
  STAFF: 'staff',
  CUSTOMER: 'customer',
} as const;

export const ROLE_PERMISSIONS = {
  super_admin: ['manage_all_branches', 'manage_admins', 'view_analytics', 'manage_subscriptions'],
  branch_admin: ['manage_branch', 'manage_staff', 'view_analytics', 'handle_escalations'],
  staff: ['call_token', 'serve_customer', 'transfer_token', 'view_queue'],
  customer: ['book_token', 'reserve_slot', 'track_queue', 'submit_feedback'],
} as const;

// Notification Configuration
export const NOTIFICATION_CHANNELS = {
  PUSH: 'push',
  EMAIL: 'email',
  SMS: 'sms',
  WHATSAPP: 'whatsapp',
} as const;

export const NOTIFICATION_EVENTS = {
  TOKEN_GENERATED: 'token_generated',
  TURN_APPROACHING: 'turn_approaching',
  COUNTER_CHANGED: 'counter_changed',
  QUEUE_DELAYED: 'queue_delayed',
  SERVICE_COMPLETED: 'service_completed',
} as const;

// AI Configuration
export const AI_CONFIG = {
  PREDICTION_CONFIDENCE_THRESHOLD: 70, // percentage
  ABANDONMENT_THRESHOLD: {
    LOW: 33,
    MEDIUM: 66,
    HIGH: 100,
  },
  MODEL: process.env.NEXT_PUBLIC_GENKIT_MODEL || 'gemini-1.5-pro',
};

// Default Queue Settings
export const QUEUE_CONFIG = {
  DEFAULT_WAIT_TIME: parseInt(process.env.NEXT_PUBLIC_DEFAULT_WAIT_TIME || '10'),
  DEFAULT_SERVICE_TIME: parseInt(process.env.NEXT_PUBLIC_DEFAULT_SERVICE_TIME || '8'),
  MAX_QUEUE_SIZE: 1000,
  PREDICTION_WINDOW: 60, // minutes ahead to predict
};

// Display Configuration
export const DISPLAY_CONFIG = {
  REFRESH_RATE: 3000, // ms
  TOKENS_TO_DISPLAY: 5,
  ANNOUNCEMENT_DURATION: 5000, // ms
};

// Geolocation Configuration
export const GEOLOCATION_CONFIG = {
  ENABLED: process.env.NEXT_PUBLIC_ENABLE_GEOLOCATION === 'true',
  RADIUS: parseInt(process.env.NEXT_PUBLIC_GEOLOCATION_RADIUS || '500'), // meters
  TIMEOUT: 10000, // ms
};

// Feature Flags
export const FEATURE_FLAGS = {
  AI_PREDICTIONS: process.env.NEXT_PUBLIC_ENABLE_AI_PREDICTIONS === 'true',
  SENTIMENT_ANALYSIS: process.env.NEXT_PUBLIC_ENABLE_SENTIMENT_ANALYSIS === 'true',
  PRIORITY_QUEUE: process.env.NEXT_PUBLIC_ENABLE_PRIORITY_QUEUE === 'true',
  ANNOUNCEMENTS: process.env.NEXT_PUBLIC_ENABLE_ANNOUNCEMENTS === 'true',
  QR_CHECK_IN: process.env.NEXT_PUBLIC_ENABLE_QR_CHECK_IN === 'true',
  GEOLOCATION: process.env.NEXT_PUBLIC_ENABLE_GEOLOCATION === 'true',
};

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  TIMEOUT: 30000, // ms
  RETRY_ATTEMPTS: 3,
};

// Session Configuration
export const SESSION_CONFIG = {
  TIMEOUT: parseInt(process.env.NEXT_PUBLIC_SESSION_TIMEOUT || '3600'), // seconds
  REMEMBER_ME_DURATION: 7 * 24 * 60 * 60, // 7 days
};

// Color Configuration
export const COLORS = {
  PRIMARY: '#5DADE2', // Calming Blue
  BACKGROUND: '#F0F4F7', // Light Gray
  ACCENT: '#A8E6CE', // Soft Green
  POSITIVE: '#52C41A',
  NEUTRAL: '#1890FF',
  NEGATIVE: '#FF4D4F',
};

// Languages
export const LANGUAGES = {
  EN: 'en',
  ES: 'es',
  HI: 'hi',
  FR: 'fr',
  DE: 'de',
} as const;

export const DEFAULT_LANGUAGE = 'en';

// Time Zones
export const SUPPORTED_TIMEZONES = [
  'UTC',
  'America/New_York',
  'Europe/London',
  'Asia/Tokyo',
  'Asia/Dubai',
  'Asia/Kolkata',
] as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
};

// Database
export const DB_CONFIG = {
  BATCH_SIZE: 100,
  CONNECTION_TIMEOUT: 10000,
};

// Rate Limiting
export const RATE_LIMIT = {
  API_CALLS_PER_MINUTE: 60,
  LOGIN_ATTEMPTS_PER_MINUTE: 5,
  TOKEN_GENERATION_PER_HOUR: 1000,
};
