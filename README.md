# SmartQueue – Real-Time Token Management System

## Overview

SmartQueue is a real-time token and queue management system designed to streamline service workflows and reduce waiting time. The platform provides live queue updates, secure authentication, and role-based dashboards for administrators, staff, and users. It is built using the MERN stack with WebSockets to enable instant data synchronization across clients.

---

## Features

* Real-time token updates using WebSockets
* Role-based dashboards (Admin, Staff, User)
* Secure authentication with JWT
* RESTful API architecture
* Live queue status tracking
* Concurrent handling of 100+ active tokens
* Scalable backend structure with modular routes

---

## Tech Stack

**Frontend**

* React.js
* Redux (State Management)
* HTML5, CSS3

**Backend**

* Node.js
* Express.js
* MongoDB with Mongoose
* JWT Authentication
* REST APIs
* WebSockets (Real-time communication)

---

## System Architecture

SmartQueue follows a client-server architecture:

* React frontend communicates with Express backend via REST APIs.
* WebSockets enable instant token updates without refreshing the page.
* MongoDB stores queue data, user roles, and authentication details.
* JWT ensures secure session handling and protected routes.

---

## Installation

### 1. Clone the Repository

```
git clone https://github.com/your-username/smartqueue.git
cd smartqueue
```

### 2. Install Dependencies

Frontend:

```
cd client
npm install
```

Backend:

```
cd server
npm install
```

### 3. Environment Variables

Create a `.env` file inside the server folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### 4. Run the Project

Backend:

```
npm run dev
```

Frontend:

```
npm start
```

---

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
