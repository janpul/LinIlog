// app.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './homepage';
import About from './about';
import Signup from './signup';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminRegister from './AdminRegister';
import AdminNotFound from './AdminNotFound';
import NotFound from './NotFound';
import Cleanups from './cleanups';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  
  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
    return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage navigateTo={navigateTo} />} />
          <Route path="/about" element={<About navigateTo={navigateTo} />} />
          <Route path="/signup" element={<Signup navigateTo={navigateTo} />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/*" element={<AdminNotFound />} />
          <Route path="/cleanups" element={<Cleanups />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;