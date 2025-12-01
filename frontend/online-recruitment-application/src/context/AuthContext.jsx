import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [candidate, setCandidate] = useState(() => {
    const storedCandidate = localStorage.getItem("candidate");
    return storedCandidate ? JSON.parse(storedCandidate) : null;
  });

  const [employer, setEmployer] = useState(() => {
    const storedEmployer = localStorage.getItem("employer");
    return storedEmployer ? JSON.parse(storedEmployer) : null;
  });

  // Save candidate whenever it changes
  useEffect(() => {
    if (candidate) {
      localStorage.setItem("candidate", JSON.stringify(candidate));
    } else {
      localStorage.removeItem("candidate");
    }
  }, [candidate]);

  // Save employer whenever it changes
  useEffect(() => {
    if (employer) {
      localStorage.setItem("employer", JSON.stringify(employer));
    } else {
      localStorage.removeItem("employer");
    }
  }, [employer]);

  const login = (user, role) => {
    if (role === "candidate") setCandidate(user);
    else setEmployer(user);
  };

  const logout = (role) => {
    if (role === "candidate") setCandidate(null);
    else setEmployer(null);
  };

  return (
    <AuthContext.Provider
      value={{
        candidate,
        employer,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
