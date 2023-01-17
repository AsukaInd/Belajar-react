import { VisitorLogHeader } from "~/features/dashboard/facilityManagement/visitorLog/VisitorLogHeader";
import { VisitorLogFilter } from "~/features/dashboard/facilityManagement/visitorLog/VisitorLogFilter";
import { useState } from "react";
import { PreRegistrationVisitorTable } from "~/features/dashboard/facilityManagement/visitorLog/PreRegistrationVisitorTable";
import { Button } from "primereact/button";
import { BsGrid1X2 } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { CheckInMain } from "../visitorLog/CheckInMain";
import { CheckOutMain } from "../visitorLog/CheckOutMain";

export default function VisitorLog() {
   const [activeTab, setActiveTab] = useState(0)
   const [isGridView, setIsGridView] = useState(false)

   const preregisterData = {
      data: [
         {
            id: 1,
            status: "in",
            image: "/dummy-profile.png",
            officer: {
               first_name: "John",
               last_name: "Doe",
            },
            date_in: "2022-08-22T05:25:47.000000Z",
            date_out: "2022-08-22T05:25:47.000000Z",
            start_date: "2022-08-22T05:25:47.000000Z",
            end_date: "2022-08-22T05:25:47.000000Z",
            company: "Guard tour",
            id_type: "Driver License",
            destination: "Floor 2",
            host: "John Doe",
            host_company: "LG",
            sites: "Semarang Site",
            signed_in: { name: "John Doe", image: "/dummy-profile.png" },
            signed_out: { name: "John Doe", image: "/dummy-profile.png" },
            in_notes:
               "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
            out_notes:
               "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
         },
      ],
   };

   return (
      <>
         <VisitorLogHeader activeTab={activeTab} setActiveTab={setActiveTab} />
         <div className="flex justify-between items-center flex-wrap-reverse mx-[30px] mt-4">
            <div>
               <Button
                  icon={<BsGrid1X2 />}
                  className="p-button-rounded mr-2 p-button-text"
                  onClick={() => setIsGridView(true)}
               />
               <Button
                  icon={<FaListUl />}
                  className="p-button-rounded p-button-text"
                  onClick={() => setIsGridView(false)}
               />
            </div>
            <VisitorLogFilter />
         </div>
         {
            activeTab === 0
               ? <CheckInMain setIsGridView={setIsGridView} isGridView={isGridView} />
               : activeTab === 1 ? (
                  <div className="layout-content">
                     <PreRegistrationVisitorTable
                        data={preregisterData}
                        rowSelection={rowSelection}
                        setRowSelection={setRowSelection}
                     />
                  </div>
               ) : <CheckOutMain setIsGridView={setIsGridView} isGridView={isGridView} />
         }
      </>
   );
}
