import React, { useState } from 'react';
import { AppBar, Tabs, Tab, IconButton, Toolbar } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [value, setValue] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    // Redirect to login page
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Tabs value={value} onChange={handleChange}>
          <Tab
            component={Link}
            to="/dashboard"
            label="Dashboard"
            selected={location.pathname === '/dashboard'}
          />
          <Tab
            component={Link}
            to="/manage-lyrics"
            label="Manage Lyrics"
            selected={location.pathname === '/manage-lyrics'}
          />
        <Tab
            component={Link}
            to="/add-lyrics"
            label="Add Lyrics"
            selected={location.pathname === '/add-lyrics'}
          />
        </Tabs>
        <div style={{ marginLeft: 'auto' }}>
          <IconButton color="inherit" onClick={handleLogout}>
            <ExitToAppIcon style={{ fontSize: '1.5rem' }} />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
