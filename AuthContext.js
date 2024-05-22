import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from './AuthService'; // Import your AuthService

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const { isLoggedIn } = await AuthService.isLoggedIn();
      setIsAuthenticated(isLoggedIn);
    };

    checkLoginStatus();
  }, []);

  // Register function
  const register = async (name, email, password) => {
    try {
      const response = await AuthService.register(name, email, password);
      setUserInfo(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      const success = await AuthService.login(email, password);
      if (success) {
        setIsAuthenticated(true);
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await AuthService.logout();
      setIsAuthenticated(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        isAuthenticated,
        register,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
