import { lazy } from "react";
import { LazyLoad } from "~/components/LazyLoad";
import { ProtectedRoute } from "~/features/auth/ProtectedRoute";
import { useAuth } from "~/features/auth/useAuth";
import { FreelancerLayout } from "../layout/FreelancerLayout";

const FreelancerDashboard = lazy(() => import("./FreelancerDashboard"));
const Login = lazy(() => import("./Login"));
const RegisterUser = lazy(() => import("./RegisterUser"));
// const FreelancerRegister = lazy(() => import ("./RegisterFreelancer"));
const Gigs = lazy(() => import("./Gigs"));
// const Package = lazy(() => import("./Package"));
const GigsStepPage = lazy(() => import("../gigs/GigsStepPage"));
const ProfileStepPage = lazy(() => import("../profile/ProfileStepPage"));
const MyProfile = lazy(() => import("./MyProfile"));

export function FreelancerRoutes() {
   const { adminToken, freelancerToken } = useAuth();

   const publicRoutes = [
      {
         path: "login",
         element: (
            <LazyLoad>
               <Login />
            </LazyLoad>
         ),
      },
      {
         path: "user/register",
         element: (
            <LazyLoad>
               <RegisterUser />
            </LazyLoad>
         ),
      },
   ];

   const privateRoutes = {
      element: (
         <ProtectedRoute
            isAuth={Boolean(adminToken) || Boolean(freelancerToken)}
            redirect="/freelancer/login"
         />
      ),
      children: [
         {
            element: <FreelancerLayout />,
            children: [
               {
                  path: "",
                  element: (
                     <LazyLoad>
                        <FreelancerDashboard />
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
               //   {
               //     path: "gigs/:id",
               //      element: (
               //         <LazyLoad>
               //            <Package />
               //         </LazyLoad>
               //      ),
               //   },
               //   {
               //     path: "register",
               //     element: (
               //        <LazyLoad>
               //           <FreelancerRegister />
               //        </LazyLoad>
               //     ),
               //  },
               {
                  path: "gigs/:id",
                  element: (
                     <LazyLoad>
                        <GigsStepPage />
                     </LazyLoad>
                  ),
               },
               {
                  path: "register/:id",
                  element: (
                     <LazyLoad>
                        <ProfileStepPage />
                     </LazyLoad>
                  ),
               },
               {
                  path: "my-profile",
                  element: (
                     <LazyLoad>
                        <MyProfile />
                     </LazyLoad>
                  ),
               },
            ],
         },
      ],
   };

   return {
      path: "/freelancer",
      children: [...publicRoutes, privateRoutes],
   };
}