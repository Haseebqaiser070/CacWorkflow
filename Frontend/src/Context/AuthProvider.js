import { createContext, useState, useEffect } from "react";
import axios from "axios"
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(false);


  return (
      <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
          {children}
      </AuthContext.Provider>
  )
}


export default AuthContext;
