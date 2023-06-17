import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ManageLyrics from './components/ManageLyrics';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/manage-lyrics" element={isLoggedIn ? <ManageLyrics /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
