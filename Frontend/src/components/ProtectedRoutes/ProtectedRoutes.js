import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../MyHooks/useAuth";

const ProtrctedRoutes = ({ allowedRoles }) => {
    const { auth,persist } = useAuth();
    const location = useLocation();
console.log("Auth",auth)
console.log(allowedRoles)
console.log(auth?.Roles?.includes(allowedRoles))
return (
        auth?.Roles?.includes(allowedRoles)
            ? <Outlet />
            :  <Navigate to="/" replace />
    );
}

export default ProtrctedRoutes;