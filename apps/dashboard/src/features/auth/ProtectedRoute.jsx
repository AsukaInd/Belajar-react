import { Outlet, Navigate } from "react-router-dom";

export function ProtectedRoute({ isAuth, children, redirect = "/" }) {
   if (!isAuth) {
      return <Navigate to={redirect} replace />;
   }

   return children || <Outlet />;
}
