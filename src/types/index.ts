// ==================== USER & ROLES ====================
export type UserRole = 'super_admin' | 'branch_admin' | 'staff' | 'customer';
export type TokenStatus = 'waiting' | 'reserved' | 'called' | 'serving' | 'served' | 'cancelled' | 'no_show';
export type PriorityLevel = 'normal' | 'senior' | 'emergency' | 'premium' | 'vip';
export type RiskLevel = 'low' | 'medium' | 'high';
export type SentimentType = 'positive' | 'neutral' | 'negative';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  branchId?: string;
  avatar?: string;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

// ==================== BRANCH & LOCATION ====================
export interface Branch {
  id: string;
  name: string;
  location: string;
  address: string;
  latitude?: number;
  longitude?: number;
  radius?: number; // for geolocation
  operatingHours: {
    open: string;
    close: string;
  };
  counters: string[]; // counter IDs
  staff: string[]; // staff user IDs
  createdAt: Date;
  updatedAt: Date;
}

// ==================== COUNTER & QUEUES ====================
export interface Counter {
  id: string;
  branchId: string;
  name: string;
  type: string; // e.g., 'service', 'billing', 'support'
  assignedStaff?: string; // staff user ID
  status: 'available' | 'busy' | 'offline';
  currentTokenId?: string;
  averageServiceTime: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
}

export interface Token {
  id: string;
  tokenNumber: string; // e.g., A102, B045
  branchId: string;
  counterId?: string;
  customerId: string;
  status: TokenStatus;
  priority: PriorityLevel;
  estimatedWaitTime: number; // in minutes
  estimatedServiceTime: number; // in minutes
  actualWaitTime?: number;
  actualServiceTime?: number;
  issueTime: Date;
  calledTime?: Date;
  servedTime?: Date;
  qrCode?: string;
  reservationId?: string;
  geolocationVerified?: boolean;
  abandonmentRisk?: RiskLevel;
  abandonmentProbability?: number; // 0-100%
  serviceRating?: number; // 1-5
  feedback?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Reservation {
  id: string;
  customerId: string;
  branchId: string;
  counterId?: string;
  reservedDate: Date;
  reservedTimeSlot: {
    start: string;
    end: string;
  };
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  allocatedTokenId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface QueueState {
  tokens: Token[];
  currentlyServing: string | null;
  activeTokens: Token[];
  averageServiceTime: number;
  abandonmentRate: number;
}

export interface QueueContextType extends QueueState {
  generateToken: (customerId: string, priority?: PriorityLevel) => Promise<Token>;
  callNextToken: (counterId: string) => Promise<Token | null>;
  getUpcomingTokens: (count: number) => Token[];
  getTokenById: (id: string) => Token | undefined;
  getQueueStats: () => QueueStats;
  updateTokenStatus: (tokenId: string, status: TokenStatus) => Promise<void>;
  transferToken: (tokenId: string, newCounterId: string) => Promise<void>;
}

// ==================== AI PREDICTIONS ====================
export interface WaitTimePrediction {
  tokenId: string;
  estimatedWaitMinutes: number;
  confidence: number; // 0-100%
  factors: {
    historicalAverage: number;
    currentQueueLength: number;
    activeStaffCount: number;
    peakHourFactor: number;
  };
}

export interface AbandonmentPrediction {
  tokenId: string;
  riskLevel: RiskLevel;
  probability: number; // 0-100%
  recommendedAction: string;
}

export interface StaffRecommendation {
  recommendedCount: number;
  currentCount: number;
  utilizationRate: number; // 0-100%
  suggestions: string[];
}

// ==================== NOTIFICATIONS ====================
export type NotificationChannel = 'push' | 'email' | 'sms' | 'whatsapp';
export type NotificationEvent = 
  | 'token_generated' 
  | 'turn_approaching' 
  | 'counter_changed' 
  | 'queue_delayed' 
  | 'service_completed';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationEvent;
  channels: NotificationChannel[];
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: Date;
}

// ==================== FEEDBACK & SENTIMENT ====================
export interface Feedback {
  id: string;
  tokenId: string;
  customerId: string;
  branchId: string;
  rating: number; // 1-5
  feedback: string;
  sentiment?: SentimentType;
  sentimentScore?: number; // 0-1
  categories: string[]; // e.g., 'speed', 'courtesy', 'cleanliness'
  createdAt: Date;
}

// ==================== ANALYTICS ====================
export interface QueueStats {
  waitingCount: number;
  servedTodayCount: number;
  averageWaitTime: number;
  averageServiceTime?: number;
  peakHour?: string;
  noShowRate?: number; // percentage
  satisfactionScore?: number; // 0-5
}

export interface BranchAnalytics {
  branchId: string;
  date: Date;
  dailyCustomers: number;
  averageWaitTime: number;
  averageServiceTime: number;
  noShowCount: number;
  satisfactionScore: number;
  staffUtilization: number; // percentage
  peakHours: string[];
}

export interface StaffPerformance {
  id: string;
  staffId: string;
  branchId: string;
  date: Date;
  tokensServed: number;
  averageServiceTime: number;
  customerSatisfaction: number; // 0-5
  completedTasks: number;
  missedTasks: number;
}

export interface QueueHistory {
  id: string;
  tokenId: string;
  timestamp: Date;
  action: string; // e.g., 'generated', 'called', 'served'
  details?: Record<string, any>;
}

// ==================== ANNOUNCEMENTS ====================
export interface Announcement {
  id: string;
  branchId: string;
  counterId?: string;
  message: string;
  language: string; // e.g., 'en', 'es', 'hi'
  priority: 'normal' | 'urgent';
  status: 'pending' | 'announced' | 'completed';
  createdAt: Date;
  scheduledFor?: Date;
}

// ==================== CONFIGURATION ====================
export interface QueueSimulation {
  id: string;
  branchId: string;
  customerVolume: number;
  staffCount: number;
  avgServiceDuration: number; // in minutes
  results: {
    predictedWaitTime: number;
    bottlenecks: string[];
    suggestions: string[];
  };
}

export interface AISettings {
  enablePredictions: boolean;
  enableAbandonmentDetection: boolean;
  enableSentimentAnalysis: boolean;
  enablePriorityQueue: boolean;
  predictionAccuracy: number; // 0-100
}

export interface SystemSettings {
  darkMode: boolean;
  language: string;
  timezone: string;
  aiSettings: AISettings;
}

// ==================== DISPLAY BOARD ====================
export interface DisplayBoard {
  id: string;
  branchId: string;
  displayType: 'full_queue' | 'current_only' | 'announcements';
  showWaitTime: boolean;
  showNextTokens: number;
  refreshRate: number; // in seconds
  theme: 'light' | 'dark';
}
