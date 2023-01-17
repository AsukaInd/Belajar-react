import { lazy } from "react";
import { LazyLoad } from "~/components/LazyLoad";
import { ProtectedRoute } from "~/features/auth/ProtectedRoute";
import { useAuth } from "~/features/auth/useAuth";
import { CheckIsInside } from "../components/CheckIsInside";
import InspectionList from "./InspectionList";
import InspectionItemDetails from "./InspectionItemDetails";
import Report from "./Report";
import InspectionQuestion from "./InspectionQuestion";
import Report4 from "./Report4";
import Report5 from "./Report5";
import Report6 from "./Report6";
import Report7 from "./Report7";
import { SelectSite } from "../components/SelectSite";
import { OfficerHomeLayout } from "../layout/OfficerHomeLayout";
import { OfficerLayoutWithBackButton } from "../layout/OfficerLayoutWithBackButton";

const OfficerMenu = lazy(() => import("./Menu"));
const LoginPage = lazy(() => import("./Login"));
const MaintenanceRequest = lazy(() => import("./MaintenanceRequest"));
const DailyActivity = lazy(() => import("./DailyActivity"));
const VisitorIn = lazy(() => import("./VisitorIn"));
const VisitorOut = lazy(() => import("./VisitorOut"));
const TruckIn = lazy(() => import("./TruckIn"));
const TruckOut = lazy(() => import("./TruckOut"));
const PreregisterVisitor = lazy(() => import("./PreregisterVisitor"));
const PreregisterVisitorList = lazy(() => import("./PreregisterVisitorList"));
const PreregisterVisitorDetails = lazy(() =>
   import("./PreregisterVisitorDetails")
);
const Onboarding = lazy(() =>
   import("./Onboarding")
);

export function OfficerRoutes() {
   const { officerToken } = useAuth();

   const publicRoutes = [
      {
         path: "",
         element: (
            <LazyLoad>
               <Onboarding />
            </LazyLoad>
         ),
      },
      {
         path: "login",
         element: (
            <LazyLoad>
               <LoginPage />
            </LazyLoad>
         ),
      },
   ];

   const privateRoutes = {
      element: (
         <ProtectedRoute
            isAuth={Boolean(officerToken)}
            redirect="/officer/login"
         />
      ),
      children: [
         {
            element: <OfficerHomeLayout />,
            children: [
               {
                  path: "inspection",
                  element: (
                     <LazyLoad>
                        <InspectionList />
                     </LazyLoad>
                  ),
               },
               {
                  path: "inspection/:inspectionId",
                  element: (
                     <LazyLoad>
                        <InspectionItemDetails />
                     </LazyLoad>
                  ),
               },
               {
                  path: "inspection/:inspectionId/chapter/:chapterId",
                  element: (
                     <LazyLoad>
                        <InspectionQuestion />
                     </LazyLoad>
                  ),
               },
            ],
         },

         {
            element: (
               <LazyLoad>
                  <CheckIsInside />
               </LazyLoad>
            ),
            children: [
               {
                  path: "menu/:siteId",
                  children: [
                     {
                        path: "",
                        element: (
                           <LazyLoad>
                              <OfficerMenu />
                           </LazyLoad>
                        ),
                     },
                     {
                        path: "maintenance-request",
                        element: (
                           <LazyLoad>
                              <MaintenanceRequest />
                           </LazyLoad>
                        ),
                     },
                     {
                        path: "daily-activity",
                        element: (
                           <LazyLoad>
                              <DailyActivity />
                           </LazyLoad>
                        ),
                     },
                     {
                        path: "visitor-in",
                        element: (
                           <LazyLoad>
                              <VisitorIn />
                           </LazyLoad>
                        ),
                     },
                     {
                        path: "visitor-out",
                        element: (
                           <LazyLoad>
                              <VisitorOut />
                           </LazyLoad>
                        ),
                     },
                     {
                        path: "vehicle-in",
                        element: (
                           <LazyLoad>
                              <TruckIn />
                           </LazyLoad>
                        ),
                     },
                     {
                        path: "vehicle-out",
                        element: (
                           <LazyLoad>
                              <TruckOut />
                           </LazyLoad>
                        ),
                     },
                     {
                        path: "preregister-visitor",
                        element: (
                           <LazyLoad>
                              <PreregisterVisitor />
                           </LazyLoad>
                        ),
                     },
                     {
                        path: "preregister-visitor/:hostId/visitors",
                        element: (
                           <LazyLoad>
                              <PreregisterVisitorList />
                           </LazyLoad>
                        ),
                     },
                     {
                        path: "preregister-visitor/:hostId/visitors/:visitorId",
                        element: (
                           <LazyLoad>
                              <PreregisterVisitorDetails />
                           </LazyLoad>
                        ),
                     },
                  ],
               },
            ],
         },

         {
            path: "inspection/:inspectionId/report",
            element: (
               <LazyLoad>
                  <Report />
               </LazyLoad>
            ),
         },
         {
            path: "inspection/:inspectionId/report-4",
            element: (
               <LazyLoad>
                  <Report4 />
               </LazyLoad>
            ),
         },
         {
            path: "inspection/:inspectionId/report-5",
            element: (
               <LazyLoad>
                  <Report5 />
               </LazyLoad>
            ),
         },
         {
            path: "inspection/:inspectionId/report-6",
            element: (
               <LazyLoad>
                  <Report6 />
               </LazyLoad>
            ),
         },
         {
            path: "inspection/:inspectionId/report-7",
            element: (
               <LazyLoad>
                  <Report7 />
               </LazyLoad>
            ),
         },
      ],
   };

   return {
      path: "/officer",
      element: (
         <LazyLoad>
            <SelectSite />
         </LazyLoad>
      ),
      children: [...publicRoutes, privateRoutes],
   };
}
