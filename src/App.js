import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ManageLyrics from './components/ManageLyrics';
import Navbar from './components/Navbar';
import AddLyrics from './components/AddLyrics';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const basename = process.env.PUBLIC_URL;

  return (
    <Router basename={basename}>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/manage-lyrics"
          element={isLoggedIn ? <ManageLyrics /> : <Navigate to="/" />}
        />
        <Route
          path="/add-lyrics"
          element={isLoggedIn ? <AddLyrics /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
