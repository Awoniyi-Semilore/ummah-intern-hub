import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USERS } from '../utils/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to get ALL users (Mocks + Registered)
  const getAllUsers = () => {
    const registeredUsers = JSON.parse(localStorage.getItem('registered_users')) || [];
    // Combine them, making sure not to duplicate by email
    return [...MOCK_USERS, ...registeredUsers];
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('internship_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // SIGNUP: Saves to a specific 'registered_users' key
  const signup = (newUser) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registered_users')) || [];
    
    // Check if user exists in either MOCK or Registered
    const allUsers = getAllUsers();
    if (allUsers.find(u => u.email.toLowerCase() === newUser.email.toLowerCase())) {
      return { success: false, message: "User already exists with this email" };
    }

    const updatedRegistered = [...registeredUsers, { ...newUser, id: `u-${Date.now()}` }];
    localStorage.setItem('registered_users', JSON.stringify(updatedRegistered));
    
    return { success: true };
  };

  // LOGIN: Looks through the merged list
  const login = (email, password) => {
    const allUsers = getAllUsers();
    const foundUser = allUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      const userData = { ...foundUser };
      delete userData.password;
      setUser(userData);
      localStorage.setItem('internship_user', JSON.stringify(userData));
      return { success: true };
    } else {
      return { success: false, message: "Invalid email or password" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('internship_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);