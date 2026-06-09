# SmartQueue 2.0 – Enterprise AI-Powered Queue & Token Management System

## 🎯 Project Vision

**SmartQueue 2.0** is a production-ready SaaS platform designed to help organizations manage customer queues efficiently while reducing waiting time, improving staff utilization, and providing real-time operational insights.

The application serves: hospitals, banks, government offices, universities, service centers, restaurants, and corporate help desks.

The system provides real-time queue management, AI-powered predictions, analytics, notifications, digital displays, QR check-in, and multi-branch management.

---

## 🏗️ Tech Stack

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **React 19** with hooks
- **Tailwind CSS** for styling
- **Radix UI / ShadCN UI** components
- **React Hook Form** for forms
- **Zod** for validation
- **Recharts** for analytics visualization

### Backend
- **Next.js Server Actions** for mutations
- **REST APIs** with Route Handlers
- **WebSockets** (Socket.IO) for real-time updates
- **MongoDB** with Mongoose ODM
- **Firebase Authentication** (OAuth2, Email/Password)
- **Google Genkit** for AI capabilities

### AI & Notifications
- **Google Gemini API** for predictions and sentiment analysis
- **Firebase Cloud Messaging** for push notifications
- **Email & WhatsApp** integration (optional)

### Deployment
- **Vercel** (Frontend)
- **MongoDB Atlas** (Database)
- **Firebase** (Auth & Messaging)

---

## 👥 User Roles & Permissions

### Super Admin
- ✅ Manage all branches globally
- ✅ Manage and approve branch admins
- ✅ View comprehensive global analytics
- ✅ Configure AI settings
- ✅ Manage subscriptions and billing
- ✅ Access system reports and audit logs

### Branch Admin
- ✅ Manage branch operations
- ✅ Create and manage counters
- ✅ Manage branch staff
- ✅ Monitor queue performance
- ✅ View branch-specific analytics
- ✅ Handle escalations
- ✅ Configure branch settings

### Staff
- ✅ Call next token
- ✅ Serve customers
- ✅ Transfer customers to different counters
- ✅ Pause/resume queue
- ✅ Mark token status (serving, served)
- ✅ View assigned counters
- ✅ Access performance metrics

### Customer
- ✅ Book tokens online
- ✅ Reserve time slots
- ✅ Track queue status in real-time
- ✅ Receive push notifications
- ✅ Submit feedback and ratings
- ✅ Check estimated wait times
- ✅ Generate and scan QR codes

---

## 🚀 Core Features

### 1. Real-Time Queue Management
**Features:**
- Token generation with automatic numbering
- Live queue tracking and updates
- Token status transitions (Waiting → Called → Serving → Served)
- Queue pause/resume functionality
- Queue transfer between counters
- Token cancellation with reasons
- WebSocket-based real-time synchronization

**Token Statuses:**
- ⏳ `waiting` - In queue
- 📅 `reserved` - Pre-booked slot
- 📢 `called` - Announced at counter
- 🔄 `serving` - Currently being served
- ✅ `served` - Service completed
- ❌ `cancelled` - Cancelled by customer
- 🚫 `no_show` - Didn't show up

---

### 2. AI Wait Time Prediction
**AI Capabilities:**
- Predict estimated waiting time based on historical data
- Estimate service completion time
- Identify peak hour traffic patterns
- Factor in:
  - Historical service duration data
  - Current active staff count
  - Real-time queue size
  - Branch-specific patterns
  - Day/time patterns

**Display Information:**
- Predicted wait time with confidence percentage
- Real-time updates as queue evolves

---

### 3. Queue Abandonment Prediction
**AI Features:**
- Predict customers likely to leave before their turn
- Calculate abandonment probability (0-100%)
- Assign risk levels:
  - 🟢 `low` - Safe
  - 🟡 `medium` - Monitor
  - 🔴 `high` - Take action

**Automated Actions:**
- Send reminder notifications
- Prioritize at-risk tokens
- Alert branch managers
- Dashboard visibility

---

### 4. Smart Priority Queue Engine
**Priority Factors:**
- 👴 Senior citizens
- 🆘 Emergency cases
- 👑 Premium/VIP customers
- ⏱️ Long waiting customers
- ⭕ Dynamic scoring based on wait time

**Features:**
- Automatic dynamic queue reordering
- Customizable scoring rules by admin
- Fair queue management
- Real-time priority adjustments

---

### 5. QR-Based Check-In System
**Customer Flow:**
```
Book Token → Receive QR Code → Arrive at Branch 
→ Scan QR → Token Activated → Join Queue
```

**Features:**
- Automatic QR code generation per token
- QR verification at entry
- Geolocation validation (optional)
- Expiration handling
- Mobile-friendly scanning

---

### 6. Queue Reservation System
**Features:**
- Select preferred date for service
- Choose time slot from available slots
- Automatic token allocation
- Reservation confirmation
- Cancellation with notice period
- Reminder notifications

**Benefits:**
- Reduced no-show rates
- Better capacity planning
- Improved customer experience
- Predictable traffic

---

### 7. Voice Announcement System
**Features:**
- Text-to-speech announcements
- Example: "Token A102 please proceed to Counter 3"
- Multi-language support (EN, ES, HI, etc.)
- Announcement queue management
- Custom announcement templates
- Manual and automated triggers

---

### 8. Digital Display Board
**Display Types:**
- Full queue board (all tokens)
- Current counter display
- Announcements only

**Information Displayed:**
- Currently serving token
- Next tokens in queue
- Counter status
- Estimated wait times
- Real-time announcements
- Auto-refresh without page reload

**Features:**
- Large screen optimized
- Auto-rotation of information
- Customizable display themes
- Multi-language support

---

### 9. Multi-Branch Management
**Features:**
- Support for multiple service locations
- Branch-specific dashboards
- Inter-branch comparisons
- Branch transfer capabilities
- Centralized admin control
- Branch-level analytics

**Use Cases:**
- Bank chains with multiple branches
- Hospital with multiple departments
- University with multiple offices
- Chain restaurants

---

### 10. Dynamic Staff Allocation
**AI Recommendations:**
- Suggest optimal staff count needed
- Identify counter utilization rates
- Recommend counter assignments
- Workforce optimization suggestions
- Peak hour staffing plans

**Displays:**
- Current vs. recommended staff
- Utilization heatmaps
- Performance predictions

---

### 11. Customer Notification System
**Notification Channels:**
- 📱 Push Notifications (in-app & device)
- 📧 Email Notifications
- 💬 WhatsApp (optional)
- 📲 SMS (future)

**Notification Events:**
- Token Generated: "Your token A045 is ready"
- Turn Approaching: "You're next! Please approach Counter 2"
- Counter Changed: "Your counter has changed to Counter 4"
- Queue Delayed: "Current wait time is now 25 minutes"
- Service Completed: "Thank you for visiting!"

**Customization:**
- User preference settings
- Notification frequency control
- Opt-in/out options

---

### 12. Feedback & Sentiment Analysis
**Post-Service Feedback:**
- Star rating (1-5)
- Text feedback
- Service category ratings
- Sentiment analysis via AI

**Sentiment Categories:**
- 😊 `positive` - Satisfied
- 😐 `neutral` - Average
- 😞 `negative` - Dissatisfied

**Dashboard Insights:**
- Sentiment trends over time
- Common feedback themes
- Staff ratings
- Service quality metrics
- Automated insights from AI

---

### 13. Analytics Dashboard
**Key Metrics:**
- 📊 Daily customers served
- ⏱️ Average wait time
- 🔄 Average service time
- 🚫 No-show rate (%)
- ⭐ Customer satisfaction score
- 👥 Staff performance metrics
- 🏢 Branch performance comparison

**Visualizations:**
- 📈 Line charts for trends
- 📊 Bar charts for comparisons
- 🥧 Pie charts for distribution
- 🔥 Heatmaps for patterns
- 📋 Detailed data tables

**Export Options:**
- PDF reports
- Excel spreadsheets
- CSV data
- Custom date ranges

---

### 14. Queue Simulation Engine
**Simulation Capabilities:**
- Simulate customer volume scenarios
- Test with different staff counts
- Adjust service duration parameters
- Predict system behavior

**Outputs:**
- Predicted wait times
- Bottleneck identification
- Optimization suggestions
- "What-if" analysis

**Use Cases:**
- Planning new branches
- Capacity planning
- Staff scheduling
- System optimization

---

### 15. Geolocation Token Activation
**Optional Feature:**
- Token activates only when customer enters branch
- Uses browser geolocation APIs
- Configurable radius (e.g., 500m)
- ETA-based activation

**Benefits:**
- Prevents premature token activation
- Ensures customer arrival
- Reduces no-show rates

---

## 📊 Database Collections

```
Users              - User accounts and roles
Branches           - Service locations
Counters           - Individual service points
Tokens             - Queue tokens
Reservations       - Pre-booked appointments
Notifications      - Notification history
Feedback           - Customer feedback
Analytics          - Historical analytics data
StaffPerformance   - Staff metrics
QueueHistory       - Token status changes
Announcements      - Voice/text announcements
```

---

## 🎨 Admin Dashboard Components

### Navigation & Layout
- 📱 Responsive Sidebar Navigation
- 🔝 Top Navigation Bar
- 🎯 Breadcrumb Navigation

### Dashboard Sections
- 📈 KPI Cards (key metrics)
- 📊 Queue Monitoring Panel
- 📋 Live Queue Table with real-time updates
- 📉 Analytics Section with charts
- 👥 Staff Monitoring & Performance
- 🔔 Notification Center
- ✨ AI Insights Widget

### Management Pages
- 🏢 Branch Management
- 🪟 Counter Management
- 👨‍💼 Staff Management
- 🔐 User & Permissions
- ⚙️ System Settings
- 🎯 Priority Rules Configuration

---

## 👨‍💻 Staff Dashboard Components

- 🎯 Active Counter Assignment
- 👤 Current Customer Display
- ➡️ Next Token Preview
- 📢 Call Next Button (with voice)
- 🔄 Transfer Token Button
- ✅ Complete Service Button
- 📊 Personal Performance Stats
- 📱 Quick Actions Panel

---

## 👥 Customer Dashboard Components

- 🎫 My Token Status
- 📊 Live Queue Visualization
- ⏱️ Wait Time Prediction
- 🔲 QR Code Display
- 🔔 Real-time Notifications
- ⭐ Feedback & Rating Form
- 📱 Service History
- 🗓️ Reservation Management

---

## ✅ System Requirements

### Frontend
- ✅ Fully Responsive Design
- ✅ Mobile-First Approach
- ✅ Dark/Light Mode Support
- ✅ Accessibility (WCAG 2.1)
- ✅ Progressive Web App (PWA)
- ✅ Offline Support

### Backend & Infrastructure
- ✅ Role-Based Access Control (RBAC)
- ✅ Real-Time Updates via WebSockets
- ✅ Comprehensive Error Handling
- ✅ Loading States & Placeholders
- ✅ Audit Logging
- ✅ Activity Tracking
- ✅ Rate Limiting
- ✅ API Versioning

### Security
- ✅ JWT Authentication
- ✅ OAuth2 Integration
- ✅ HTTPS Encryption
- ✅ Data Validation
- ✅ XSS/CSRF Protection
- ✅ Rate Limiting
- ✅ Secure Password Storage

---

## 🎁 Bonus Features

- 📴 **Offline Support** - Works without internet
- 📱 **PWA Capability** - Install as app
- 🌍 **Multi-Language Support** - i18n ready
- 📄 **Export Reports** - PDF/Excel generation
- 🤖 **AI Assistant for Admins** - ChatBot help
- 📧 **Automated Reports** - Scheduled emails
- 🔮 **Predictive Insights** - Business intelligence
- 📞 **WhatsApp Integration** - Alternative notifications
- 🔗 **Integration APIs** - Third-party system hooks
- 📱 **Mobile App** - React Native version (future)

---

## 🚀 Getting Started

### Prerequisites
```bash
Node.js 18+
MongoDB 5.0+
Firebase Account
```

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/VanshNazwani/SmartQueue.git
cd SmartQueue
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**
```bash
# .env.local
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_domain
GENKIT_API_KEY=your_genkit_api_key
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**4. Run development server**
```bash
npm run dev
# Dev with Genkit AI
npm run genkit:dev
```

**5. Open in browser**
```
http://localhost:3000
```

---

## 📦 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API Routes
│   ├── dashboard/      # Role-based dashboards
│   ├── my-token/       # Customer pages
│   └── auth/           # Authentication pages
├── components/         # React Components
│   ├── ui/            # UI Component Library
│   └── ...
├── context/           # React Context
├── lib/               # Utilities & Helpers
│   ├── db/           # Database Models
│   ├── actions.ts    # Server Actions
│   └── utils.ts      # Helper functions
├── types/            # TypeScript Interfaces
├── hooks/            # Custom React Hooks
└── ai/              # AI Flows & Genkit
```

---

## 🔧 Available Scripts

```bash
npm run dev              # Start dev server (Turbopack)
npm run build            # Production build
npm start                # Start production server
npm run lint             # Run ESLint
npm run typecheck        # TypeScript check
npm run genkit:dev       # Start with Genkit AI
npm run genkit:watch     # Watch mode with Genkit
```

---

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/feature-name`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/feature-name`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support

For issues and questions:
- 📧 Email: support@smartqueue.com
- 💬 Discord: [Join Community](https://discord.gg/smartqueue)
- 📖 Documentation: [Docs](https://docs.smartqueue.com)

---

## 🙏 Acknowledgments

Built with ❤️ using modern web technologies and AI-powered insights.

## Usage

* Admins can manage tokens and monitor queue activity.
* Staff can update token status in real time.
* Users can view live queue updates without refreshing.

---

## API Highlights

* `POST /api/auth/login` – User authentication
* `POST /api/tokens` – Create new token
* `GET /api/tokens` – Fetch queue data
* `PUT /api/tokens/:id` – Update token status

---

## Security

* JWT-based authentication
* Protected API routes
* Role-based access control

---

## Performance

* Handles 100+ concurrent tokens efficiently
* Real-time updates reduce manual refresh and server load
* Optimized MongoDB schema and indexing

---

## Future Improvements

* Push notifications
* Analytics dashboard
* Mobile app integration
* Advanced queue prediction

---

## Author

Vansh Nazwani
Full Stack Developer | MERN Stack
