import { BrowserRouter, useRoutes } from "react-router-dom";
import { lazy } from "react";
import { LazyLoad } from "~/components/LazyLoad";
import { DashboardRoutes } from "~/features/dashboard/routes";
import { OfficerRoutes } from "~/features/officer/routes";
import { FreelancerRoutes } from "~/features/freelancer/routes";
import { AdminFreelancerRoutes } from "~/features/freelancer-admin/routes";
import { AdminRoutes } from "~/features/admin/routes";
import Profile from "~/page/Profile";

const Home = lazy(() => import("./Home"));
const NotFound = lazy(() => import("./NotFound"));

function Routes() {
   return useRoutes([
      AdminRoutes(),
      DashboardRoutes(),
      OfficerRoutes(),
      FreelancerRoutes(),
      AdminFreelancerRoutes(),
      {
         path: "/",
         element: (
            <LazyLoad>
               <Home />
            </LazyLoad>
         ),
      },
      {
         path:"profile",
         element: (
            <LazyLoad>
               <Profile/>
            </LazyLoad>
         )
      },
      {
         path: "*",
         element: (
            <LazyLoad>
               <NotFound />
            </LazyLoad>
         ),
      },
   ]);
}

export function AppRoutes() {
   return (
      <BrowserRouter basename="/app">
         <Routes />
      </BrowserRouter>
   );
}
