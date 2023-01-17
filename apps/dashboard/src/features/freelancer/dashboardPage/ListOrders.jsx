import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export function ListOrders() {
   const orders = [
      {
         id: 1,
         service_type: "Freelancer",
         project_name: "Blue Gems",
         expected_earnings: "$300",
         net_income: "$350",
         deposite_date: "06-05-2021",
         withdrawn_date: "06-05-2021",
         date: "06-05-2021",
      },
      {
         id: 2,
         service_type: "Freelancer",
         project_name: "Red Gems",
         expected_earnings: "$700",
         net_income: "$350",
         deposite_date: "06-05-2021",
         withdrawn_date: "06-05-2021",
         date: "06-05-2021",
      },
   ];

   return (
      <div>
         <div className="flex justify-content-between align-items-center mb-3">
            <h3>Freelancer List Orders</h3>
            <Button label="All orders" />
         </div>
         <div className="card">
            <DataTable value={orders} responsiveLayout="scroll">
               <Column field="id" header="ID"></Column>
               <Column field="service_type" header="Service type"></Column>
               <Column field="project_name" header="Project name"></Column>
               <Column
                  field="expected_earnings"
                  header="Expected earnings"
               ></Column>
               <Column field="net_income" header="Net income"></Column>
               <Column field="deposite_date" header="Deposite date"></Column>
               <Column field="withdrawn_date" header="Withdrawn date"></Column>
               <Column field="date" header="Date"></Column>
            </DataTable>
         </div>
      </div>
   );
}