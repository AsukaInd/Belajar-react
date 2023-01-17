import { Earnings } from "~/features/freelancer/dashboardPage/Earnings";
import { ListOrders } from "~/features/freelancer/dashboardPage/ListOrders";

export default function FreelancerDashboardPage() {
   return (
      <div className="layout-content">
         <Earnings />
         <ListOrders />
      </div>
   );
}