import { Earnings } from "~/features/dashboard/facilityManagement/dashboardPage/Earnings";
import { ActiveOrders } from "~/features/dashboard/facilityManagement/dashboardPage/ActiveOrders";

export default function MainDashboardPage() {
   return (
      <div className="layout-content">
         <Earnings />
         <ActiveOrders />
      </div>
   );
}
