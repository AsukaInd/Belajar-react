import { lazy } from "react";
import { LazyLoad } from "~/components/LazyLoad";
import { ProtectedRoute } from "~/features/auth/ProtectedRoute";
import { useAuth } from "~/features/auth/useAuth";
import { FreelancerAdminLayout } from "../layout/FreelancerAdminLayout";

const AdminLogin = lazy(() => import("./AdminLogin"));
const Dashboard = lazy(() => import("./Dashboard"));
const Gigs = lazy(() => import("./Gigs"));
const Freelancer = lazy(() => import("./Freelancer"));

export function AdminFreelancerRoutes() {
   const { freelancerAdminToken } = useAuth();

   const publicRoutes = [
      {
         path: "login",
         element: (
            <LazyLoad>
               <AdminLogin />
            </LazyLoad>
         ),
      },
   ];

   const privateRoutes = {
      element: (
         <ProtectedRoute
            isAuth={Boolean(freelancerAdminToken)}
            redirect="/admin/freelancer/login"
         />
      ),
      children: [
         {
            element: <FreelancerAdminLayout />,
            children: [
               {
                  path: "",
                  element: (
                     <LazyLoad>
                        <Dashboard />
                     </LazyLoad>
                  ),
               },
               {
                  path: "gigs",
                  element: (
                     <LazyLoad>
                        <Gigs />
                     </LazyLoad>
                  ),
               },
               {
                  path: "freelancers",
                  element: (
                     <LazyLoad>
                        <Freelancer />
                     </LazyLoad>
                  ),
               },
            ],
         },
      ],
   };

   return {
      path: "/admin/freelancer",
      children: [...publicRoutes, privateRoutes],
   };
}