import { lazy } from "react";
import { LazyLoad } from "~/components/LazyLoad";
import BookingStepPage from "../bookNow/pages/BookingStepPage";
import BookNowPage from "../bookNow/pages/BookNowPage";
import CompanyPage from "../company/pages/CompanyPage";
import ContactPage from "../contact/pages/ContactPage";
import DashboardPage from "../dashboard/DashboardPage";
import ReportPage from "../report/ReportPage";
import SchedulePage from "../schedule/SchedulePage";
import WorkActionPage from "../work-action/WorkActionPage";

export const productInspectionRoutes = [
   {
      path: "",
      element: (
         <LazyLoad>
            <DashboardPage />
         </LazyLoad>
      ),
   },
   {
      path: "company",
      element: (
         <LazyLoad>
            <CompanyPage />
         </LazyLoad>
      ),
   },
   {
      path: "contact",
      element: (
         <LazyLoad>
            <ContactPage />
         </LazyLoad>
      ),
   },
   {
      path: "book-now",
      element: (
         <LazyLoad>
            <BookNowPage />
         </LazyLoad>
      ),
   },
   {
      path: "book-now/:id",
      element: (
         <LazyLoad>
            <BookingStepPage />
         </LazyLoad>
      ),
   },
   {
      path: "schedule",
      element: (
         <LazyLoad>
            <SchedulePage />
         </LazyLoad>
      ),
   },
   {
      path: "report",
      element: (
         <LazyLoad>
            <ReportPage />
         </LazyLoad>
      ),
   },
   {
      path: "work-action",
      element: (
         <LazyLoad>
            <WorkActionPage />
         </LazyLoad>
      ),
   },
];
