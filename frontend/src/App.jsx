import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getMe } from './api';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Attendance from './pages/Attendance';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getMe()
        .then((data) => {
          setUser(data);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0D1117]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00C896]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="flex h-screen bg-[#0D1117] overflow-hidden">
        <Sidebar user={user} setUser={setUser} />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <TopBar user={user} />
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-6">
            <Routes>
              <Route path="/dashboard" element={<Dashboard user={user} />} />
              <Route path="/projects" element={<Projects user={user} />} />
              <Route path="/projects/:id" element={<ProjectDetail user={user} />} />
              <Route path="/attendance" element={<Attendance user={user} />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
