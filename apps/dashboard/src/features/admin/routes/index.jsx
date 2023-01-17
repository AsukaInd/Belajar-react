import { lazy } from "react";
import { LazyLoad } from "~/components/LazyLoad";
import { ProtectedRoute } from "~/features/auth/ProtectedRoute";
import { useAuth } from "~/features/auth/useAuth";

import { AdminLayout } from "../layout/AdminLayout";
import { productInspectionRoutes } from "../product-inspection/routes";

const AdminLogin = lazy(() => import("./../../dashboard/routes/AdminLogin"));

export function AdminRoutes() {
   const { adminToken, subscriberToken } = useAuth();
   const publicRoutes = [
      {
         path: "admin/login",
         element: (
            <LazyLoad>
               <AdminLogin />
            </LazyLoad>
         ),
      },
   ];

   const facilitiManagementRoutes = [
      {
         path: "",
         element: <h1>dashboard</h1>,
      },
   ];
   const freelancerProductRoutes = [
      {
         path: "",
         element: <h1>dashboard</h1>,
      },
   ];

   const privateRoutes = {
      element: (
         <ProtectedRoute isAuth={Boolean(adminToken)} redirect="/admin/login" />
      ),
      children: [
         {
            element: <AdminLayout />,
            children: [
               {
                  path: "admin/facility-management",
                  children: facilitiManagementRoutes,
               },
               {
                  path: "admin/product-inspection",
                  children: productInspectionRoutes,
               },
               {
                  path: "admin/freelancer-product",
                  children: freelancerProductRoutes,
               },
            ],
         },
      ],
   };

   return {
      children: [...publicRoutes, privateRoutes],
   };
}
