import { lazy } from "react";
import { LazyLoad } from "~/components/LazyLoad";

const PaymentHistory = lazy(() => import("./PaymentHistory"));
const YourSubscription = lazy(() => import("./YourSubscription"));

export const subscriptionSettingRoutes = [
   {
      path: "",
      element: (
         <LazyLoad>
            <YourSubscription />
         </LazyLoad>
      ),
   },
   {
      path: "payment-history",
      element: (
         <LazyLoad>
            <PaymentHistory />
         </LazyLoad>
      ),
   },
]