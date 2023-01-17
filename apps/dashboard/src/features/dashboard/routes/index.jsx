import { lazy } from "react";
import { DashboardLayout } from "../layout/DashboardLayout";
import { LazyLoad } from "~/components/LazyLoad";
import { ProtectedRoute } from "~/features/auth/ProtectedRoute";
import { useAuth } from "~/features/auth/useAuth";

import { facilitiManagementRoutes } from '~/features/dashboard/facilityManagement/routes'
import { subscriptionSettingRoutes } from '~/features/dashboard/subscriptionSetting/routes'
import { userProfileSettingRoutes } from '~/features/dashboard/userProfileSetting/routes'
import { productInspectionRoutes } from "~/features/dashboard/productInspection/routes";

const AdminLogin = lazy(() => import("./AdminLogin"));
const Login = lazy(() => import("./Login"));
const RegisterSubscriber = lazy(() => import("./RegisterSubscriber"));

export function DashboardRoutes() {
   const { adminToken, subscriberToken } = useAuth();
   const publicRoutes = [
      {
         path: "dashboard/login",
         element: (
            <LazyLoad>
               <Login />
            </LazyLoad>
         ),
      },
      {
         path: "admin/login",
         element: (
            <LazyLoad>
               <AdminLogin />
            </LazyLoad>
         ),
      },
      {
         path: "dashboard/register",
         element: (
            <LazyLoad>
               <RegisterSubscriber />
            </LazyLoad>
         ),
      },
   ];

   const freelancerProductRoutes = [
      {
         path: "",
         element: <h1>dashboard</h1>,
      },
   ]

   const privateRoutes = {
      element: (
         <ProtectedRoute
            isAuth={Boolean(subscriberToken)}
            redirect="/dashboard/login"
         />
      ),
      children: [
         {
            element: <DashboardLayout />,
            children: [
               {
                  path: "facility-management",
                  children: facilitiManagementRoutes
               },
               {
                  path: "product-inspection",
                  children: productInspectionRoutes
               },
               {
                  path: "freelancer-product",
                  children: freelancerProductRoutes,
               },
               {
                  path: "user-profile-setting",
                  children: userProfileSettingRoutes,
               },
               {
                  path: "subscription-setting",
                  children: subscriptionSettingRoutes,
               },
            ],
         },
      ],
   };

   return {
      children: [...publicRoutes, privateRoutes],
   };
}
