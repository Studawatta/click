import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  const login = async (inputs) => {
    const res = await axios.post(
      'http://localhost:8080/api/auth/login',
      inputs,
      {
        withCredentials: true,
      }
    );

    setCurrentUser(res.data);
  };

  const logout = async () => {
    const res = await axios.post(
      'http://localhost:8080/api/auth/logout',
      {},
      { withCredentials: true }
    );
    localStorage.removeItem('user');
    setCurrentUser(null);
    console.log(res.data);
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
