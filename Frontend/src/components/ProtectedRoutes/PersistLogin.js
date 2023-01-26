import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../MyHooks/useRefreshToken";
import useAuth from "../../MyHooks/useAuth";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setAuth, persist, setPersist } = useAuth();
  console.log("presist", auth);
  useEffect(async () => {
    if (!persist) {
      console.log("per");
      const response = await axios.get("http://localhost:4000/Auth/check", {
        withCredentials: true,
      });
      if (response.data != undefined || response.data != null) {
        await setAuth({ Roles: response.data.Roles });
        setPersist(true);
        setIsLoading(false);
      } else {
        setPersist(false);
        setIsLoading(false);
      }
    }
    if (persist) {
      setIsLoading(false);
    }
  }, []);
  return (
    <>
      {!persist && !isLoading ? (
        <Navigate to="/" replace />
      ) : isLoading ? (
        <div>
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
