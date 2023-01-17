import { lazy } from "react";
import { LazyLoad } from "~/components/LazyLoad";

const MainDashboard = lazy(() => import("./MainDashboard"));
const Site = lazy(() => import("./Site"));
const SiteDetail = lazy(() => import("../site/GridView/SiteDetail"));
const TourStop = lazy(() => import("./TourStop"));
const Visitors = lazy(() => import("./Visitors"));
const PreregisterVisitorDetail = lazy(() => import("../visitors/GridView/PreregisterVisitorDetail"));
const Asset = lazy(() => import("./Asset"));
const Vendor = lazy(() => import("./Vendor"));
const WorkOrder = lazy(() => import("./WorkOrder"));
const WorkOrderDetail = lazy(() => import('~/features/dashboard/facilityManagement/workOrder/WorkOrderDetail'))
const VehicleLog = lazy(() => import("./VehicleLog"));
const VisitorLog = lazy(() => import("./VisitorLog"));
const VisitorLogDetail = lazy(() => import("../visitorLog/checkInVisitor/GridView/VisitorLogDetail"));
const VisitorCheckOutDetail = lazy(() => import("../visitorLog/checkOutVisitor/GridView/VisitorCheckOutDetail"));
const FieldInspection = lazy(() => import("./FieldInspection"));
const Host = lazy(() => import("./Host"));

export const facilitiManagementRoutes = [
   {
      path: "",
      element: (
         <LazyLoad>
            <MainDashboard />
         </LazyLoad>
      ),
   },
   {
      path: "site",
      element: (
         <LazyLoad>
            <Site />
         </LazyLoad>
      ),
      children: [
         {
            path: ':id',
            element: (
               <LazyLoad>
                  <SiteDetail />
               </LazyLoad>
            )
         }
      ]
   },
   {
      path: "site/tour-stops",
      element: (
         <LazyLoad>
            <TourStop />
         </LazyLoad>
      ),
   },
   {
      path: "visitors",
      element: (
         <LazyLoad>
            <Visitors />
         </LazyLoad>
      ),
      children: [
         {
            path: ':id',
            element: (
               <LazyLoad>
                  <PreregisterVisitorDetail />
               </LazyLoad>
            )
         }
      ]
   },
   {
      path: "assets",
      element: (
         <LazyLoad>
            <Asset />
         </LazyLoad>
      ),
   },
   {
      path: "inventory",
      element: <h1 className="p-4">Inventory</h1>,
   },
   {
      path: "vendors",
      element: (
         <LazyLoad>
            <Vendor />
         </LazyLoad>
      ),
   },
   {
      path: "reports/work-order",
      element: (
         <LazyLoad>
            <WorkOrder />
         </LazyLoad>
      ),
      children: [
         {
            path: ':id',
            element: (
               <LazyLoad>
                  <WorkOrderDetail />
               </LazyLoad>
            )
         }
      ]
   },
   {
      path: "reports/vehicle-log",
      element: (
         <LazyLoad>
            <VehicleLog />
         </LazyLoad>
      ),
   },
   {
      path: "reports/visitor-log",
      element: (
         <LazyLoad>
            <VisitorLog />
         </LazyLoad>
      ),
      children: [
         {
            path: ':id',
            element: (
               <LazyLoad>
                  <VisitorLogDetail />
               </LazyLoad>
            )
         },
         {
            path: 'out/:id',
            element: (
               <LazyLoad>
                  <VisitorCheckOutDetail />
               </LazyLoad>
            )
         }
      ]
   },
   {
      path: "reports/field-inspections",
      element: (
         <LazyLoad>
            <FieldInspection />
         </LazyLoad>
      ),
   },
   {
      path: "reports/inventory",
      element: <h1 className="p-4">Inventory</h1>,
   },
   {
      path: "account/my-profile",
      element: <h1 className="p-4">My profile</h1>,
   },
   {
      path: "host",
      element: (
         <LazyLoad>
            <Host />
         </LazyLoad>
      ),
   },
   {
      path: "account/subscriptions",
      element: <h1 className="p-4">Subscriptions</h1>,
   },
   {
      path: "account/invoices",
      element: <h1 className="p-4">Invoices</h1>,
   },
   {
      path: "account/settings",
      element: <h1 className="p-4">Settings</h1>,
   },
]