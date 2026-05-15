================================================================================
📌 PROJECT SUBMISSION: TASKFLOW - TEAM TASK MANAGER (FULL-STACK)
================================================================================

🚀 Live Application URL:
https://web-production-f97ac.up.railway.app

📂 GitHub Repository Link:
https://github.com/laviV2/Task-Manager

================================================================================
📝 PROJECT OVERVIEW
================================================================================
TaskFlow is a comprehensive project and team management application built to 
streamline collaboration and track progress in a fast-paced environment. It 
allows admins to manage high-level projects, assign members, and monitor 
real-time status reports from the team.

================================================================================
📋 TECH STACK
================================================================================
Frontend:
- React 18 + Vite
- Tailwind CSS (Premium Dark Theme)
- React Router v6

Backend:
- Node.js + Express
- MongoDB Atlas (Cloud NoSQL)
- Mongoose ODM
- JWT Authentication

Deployment:
- Railway (Automated Build & Deployment)

================================================================================
✨ KEY FEATURES
================================================================================

1. AUTHENTICATION & ROLE-BASED ACCESS
- Secure Login and Signup for Admins and Members.
- Protected views based on user roles.

2. PROJECT & TEAM MANAGEMENT
- Create and manage projects (Internal/Client).
- Assign specific team members to projects.
- Role-based visibility: Admins see all, Members see assigned projects.

3. PROGRESS TRACKING & STATUS
- Real-time status updates (Pending, In Progress, Done, Blocked).
- Detailed project reporting system for team updates.
- Track creation and update timestamps for all records.

4. ATTENDANCE SYSTEM
- Daily punch-in/punch-out functionality.
- Automatic hours calculation.
- Attendance history log with status tracking.

5. DASHBOARD
- Centralized view of Project counts and Task status.
- Recent attendance overview.
- User profile management.

================================================================================
⚙️ LOCAL SETUP INSTRUCTIONS
================================================================================

1. Clone Repository:
   git clone https://github.com/laviV2/Task-Manager.git

2. Backend Setup:
   cd backend && npm install
   Create .env with MONGO_URI and JWT_SECRET
   npm start

3. Frontend Setup:
   cd frontend && npm install
   npm run build
   npm run dev

================================================================================
🔐 DEMO CREDENTIALS
================================================================================

Admin Account:
- Email: admin@taskflow.com
- Password: admin123

Member Account:
- Email: member@taskflow.com
- Password: member123

================================================================================
🌐 DEPLOYMENT
================================================================================
Live at: https://web-production-f97ac.up.railway.app
Deployed via Railway. CI/CD integration enabled via GitHub.

================================================================================
Built by Kashish
================================================================================
