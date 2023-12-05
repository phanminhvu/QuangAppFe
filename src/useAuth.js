import { useState } from 'react';

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false); // New state for showing/hiding menu

  const setAuthData = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    setShowMenu(true); // Show the menu when user is authenticated
    // Store token and user as needed
  };

  const clearAuthData = () => {
    setToken(null);
    setUser(null);
    setShowMenu(false); // Hide the menu when user logs out
    // Clear stored token and user
  };

  return {
    token,
    user,
    showMenu, // Expose showMenu state
    setAuthData,
    clearAuthData,
  };
};

export default useAuth;
