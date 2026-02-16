import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { users as initialUsers } from '../data/mockData';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const getStoredUsers = () => {
  try {
    const storedUsers = localStorage.getItem('skillbridge_users');
    if (!storedUsers) {
      // If no users in localStorage, seed with initialUsers
      localStorage.setItem('skillbridge_users', JSON.stringify(initialUsers));
      return initialUsers;
    }
    const parsedUsers = JSON.parse(storedUsers);
    // Ensure parsedUsers is an array, if null or not array, return initialUsers
    if (!Array.isArray(parsedUsers)) {
      localStorage.setItem('skillbridge_users', JSON.stringify(initialUsers));
      return initialUsers;
    }
    return parsedUsers;
  } catch (error) {
    console.error("Failed to parse users from localStorage, returning empty array to prevent data loss.", error);
    // On parsing error, return an empty array to prevent overwriting existing users with initialUsers
    // The existing, potentially corrupt, 'skillbridge_users' item will remain until explicitly overwritten.
    return []; 
  }
};


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(getStoredUsers);
  const [initialAuthLoading, setInitialAuthLoading] = useState(true);

  useEffect(() => {
    console.log("AuthContext.useEffect: Running to check localStorage for user on component mount.");
    try {
      const storedUser = localStorage.getItem('skillbridge_user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log("AuthContext.useEffect: User found and set from localStorage:", parsedUser);
      } else {
        console.log("AuthContext.useEffect: No user found in localStorage.");
      }
    } catch (error) {
      console.error("AuthContext.useEffect: Failed to parse 'skillbridge_user' from localStorage, removing item.", error);
      localStorage.removeItem('skillbridge_user');
    } finally {
      setInitialAuthLoading(false); // Auth check is complete
      console.log("AuthContext.useEffect: Initial authentication check complete. initialAuthLoading set to false.");
    }
  }, []);

  const login = useCallback((email, password) => {
    console.log("AuthContext.login: Function called for email:", email);
    const userToLogin = users.find(u => u.email === email && u.password === password);
    if (userToLogin) {
      setUser(userToLogin);
      localStorage.setItem('skillbridge_user', JSON.stringify(userToLogin));
      console.log("AuthContext.login: User logged in and stored in localStorage:", userToLogin);
      return userToLogin;
    }
    console.log("AuthContext.login: Login failed for email:", email, " (user not found or password incorrect)");
    return null;
  }, [users]);

      const signup = useCallback((userData) => {
      const userExists = users.some(u => u.email === userData.email);
      if (userExists) {
        throw new Error("User with this email already exists.");
      }
      let newUser = { ...userData, id: Date.now() };
          // Add default profile fields for students if not provided
          if (newUser.role === 'student') {
            newUser = {
              ...newUser,
              education: newUser.education || [],
              skills: newUser.skills || [],
              resume: newUser.resume || '',
              phone: newUser.phone || '',
              location: newUser.location || '',
              links: newUser.links || {},
              about: newUser.about || '',
              projects: newUser.projects || []
            };
          }      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem('skillbridge_users', JSON.stringify(updatedUsers));
      
      setUser(newUser);
      localStorage.setItem('skillbridge_user', JSON.stringify(newUser));
  
      return newUser;
    }, [users]);
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('skillbridge_user');
  }, []);

  const updateUser = useCallback((updates) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('skillbridge_user', JSON.stringify(updatedUser));

    const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
    setUsers(updatedUsers);
    localStorage.setItem('skillbridge_users', JSON.stringify(updatedUsers));
  }, [user, users]);

  return (
    <AuthContext.Provider value={{ user, initialAuthLoading, login, logout, signup, updateUser, users }}>
      {children}
    </AuthContext.Provider>
  );
};