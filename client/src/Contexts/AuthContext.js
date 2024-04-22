import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [User, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <AuthContext.Provider value = {{
        showLoginPopup, 
        setShowLoginPopup,
        User, 
        setUser 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
