TaskFlow - Team Task Manager

A simple, clean, and fully deployable team task management application built with modern web technologies.




[TaskFlow on Railway](https://taskflow.railway.app) _(Update with your Railway URL)_

Tech Stack

**Frontend:**

- React 18 + Vite
- Tailwind CSS
- React Router v6
- Plain JavaScript (no TypeScript)

**Backend:**

- Node.js + Express
- MongoDB Atlas
- Mongoose ODM
- JWT Authentication
- bcryptjs for password hashing

**Deployment:**

- Railway (single-service architecture)
- GitHub integration for CI/CD

 Features

Task Management

- Start, complete, and cancel tasks with time tracking
- Today's task log with duration metrics
- Filter and search tasks across all projects
- Task grouping by project
- AHT (Average Handling Time) calculations

Attendance & Time Tracking

- Daily punch in/punch out system
- Automatic hours worked calculation
- Attendance records with filtering
- CSV export functionality

Leave Management

- Apply for leave (sick, casual, unpaid, other)
- Admin approval/rejection workflow
- Leave status tracking
- Date range support

 Dashboard

- Real-time punch timer
- Today's task completion stats
- Total time and average task duration
- Project lead and reviewer information

User Management

- JWT-based authentication
- Role-based access (admin, member)
- User profile with avatar initials

 Local Setup

 Prerequisites

- Node.js 18+
- MongoDB (local or Atlas connection string)
- Git

Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/taskflow.git
cd taskflow
```

2. **Backend Setup**

```bash
cd backend
npm install

# Create .env file with your MongoDB URI
# MONGO_URI=mongodb+srv://...
# JWT_SECRET=your-secret-key

npm run dev
```

3. **Frontend Setup** (in a new terminal)

```bash
cd frontend
npm install
npm run dev
```

4. **Seed Database** (in another terminal)

```bash
cd backend
node seed.js
```

5. **Open in Browser**
   Navigate to `http://localhost:5173`

 Demo Credentials

After seeding the database:

- **Admin Account**
  - Email: `admin@taskflow.com`
  - Password: `admin123`

- **Member Account**
  - Email: `lavi@taskflow.com`
  - Password: `lavi123`

## Project Structure

```
taskflow/
├── backend/
│   ├── models/              # Mongoose schemas
│   │   ├── User.js
│   │   ├── Project.js
│   │   ├── Task.js
│   │   ├── Attendance.js
│   │   ├── Leave.js
│   │   └── Notification.js
│   ├── routes/              # API endpoints
│   │   ├── auth.js
│   │   ├── tasks.js
│   │   ├── projects.js
│   │   ├── attendance.js
│   │   ├── leaves.js
│   │   ├── dashboard.js
│   │   └── notifications.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── roleGuard.js
│   ├── server.js            # Express app entry
│   ├── seed.js              # Database seeding
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── pages/           # Route pages
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Tasks.jsx
│   │   │   ├── AllTasks.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Attendance.jsx
│   │   │   └── Leaves.jsx
│   │   ├── components/      # Reusable components
│   │   │   ├── Sidebar.jsx
│   │   │   ├── TopBar.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Toast.jsx
│   │   │   ├── Spinner.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   └── Skeleton.jsx
│   │   ├── App.jsx
│   │   ├── api.js           # API client
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── package.json             # Root scripts
└── README.md
```

## Deployment to Railway

### Prerequisites

- Railway account (free tier available)
- GitHub repository

### Steps

1. **Connect Repository**
   - Log in to Railway
   - Create new project from GitHub
   - Select this repository

2. **Set Environment Variables**
   In Railway dashboard, add:

   ```
   MONGO_URI=mongodb+srv://...
   JWT_SECRET=your-production-secret
   NODE_ENV=production
   ```

3. **Configure Build & Start**
   Railway should auto-detect, but if not:
   - Build command: `npm run build`
   - Start command: `npm start`

4. **Deploy**
   - Push to GitHub
   - Railway auto-deploys on push

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Tasks

- `GET /api/tasks` - Get all tasks (with filters)
- `GET /api/tasks/today` - Get today's tasks
- `POST /api/tasks/start` - Start a new task
- `PATCH /api/tasks/:id/complete` - Complete task
- `PATCH /api/tasks/:id/cancel` - Cancel task

### Projects

- `GET /api/projects` - Get user's projects

### Attendance

- `GET /api/attendance/today` - Today's attendance
- `POST /api/attendance/punch-in` - Punch in
- `POST /api/attendance/punch-out` - Punch out
- `GET /api/attendance` - Attendance history

### Leaves

- `GET /api/leaves` - Get leaves
- `POST /api/leaves` - Apply leave
- `PATCH /api/leaves/:id` - Review leave (admin only)

### Dashboard

- `GET /api/dashboard` - Dashboard data

### Notifications

- `GET /api/notifications` - Get notifications
- `PATCH /api/notifications/read-all` - Mark as read

## 🎨 Color Theme

Dark theme with teal accents:

- Background: `#0D1117`
- Card: `#161B22`
- Border: `#21262D`
- Accent: `#00C896`
- Text Primary: `#E6EDF3`
- Text Muted: `#8B949E`

##  License

MIT License - feel free to use this project for personal or commercial use.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please create a GitHub issue.

---


