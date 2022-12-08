import { createContext, useEffect, useState } from "react";
import React from "react";
import { app } from "../../fireBaseConfig.js";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)
  const [isOnline, setIsOnline] = useState(false)
  const auth = getAuth(app);

  useEffect(() => {
    //TODO Initialize Firebase Authentication and get a reference to the service
    onAuthStateChanged(auth, (user) => {
      if (user) {

        let userName = user.displayName;
        if (user.displayName === undefined || user.displayName === null) {
          userName = localStorage.getItem("userName");
          /* Updating the user profile with the display name. */
          updateProfile(user, { displayName: userName });
        }

        let userData = {
          name: userName,
          email: user.email,
          accessToke: user.accessToken,
          emailVerified: user.emailVerified
        };
        setUserData(userData)
        setIsOnline(true)


        /* Saving the user information to the local storage. */

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.removeItem("userName");
      } else {
        localStorage.removeItem("user");
      }
    });
  }, [])

  return <AuthContext.Provider value={{ userData, isOnline }}>
    {children}
  </AuthContext.Provider>;
};

export default AuthProvider;
