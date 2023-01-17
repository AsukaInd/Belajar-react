import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { AppTopbar } from "~/features/dashboard/layout/AppTopbar";
import ServiceItem from "../components/ServiceItem";
import { useService } from "../../api/services/service.services";
import { ProgressSpinner } from "primereact/progressspinner";
import { BulkActionOptionTemplate } from "~/components/BulkActionOptionTemplate";
import { Dropdown } from "primereact/dropdown";
import { ErrorMessage } from "~/components/ErrorMessage";

export default function BookNowPage() {
   const [sort, setSort] = useState("");

   function onBulkActionChange(event) {
      setSort(event.value);
   }
   const [{ pageIndex, pageSize }, setPagination] = useState({
      pageIndex: 0,
      pageSize: 10,
   });

   const { status, data, error } = useService({
      perPage: pageSize,
      page: pageIndex,
   });
   return (
      <>
         <AppTopbar
            left={<h1 className="text-3xl my-auto">Book Now</h1>}
            right={
               <span className="p-input-icon-left search-client search">
                  <i className="pi pi-search" />
                  <InputText placeholder="Search your client or company name here" />
               </span>
            }
         />
         <div className="layout-content">
            <div className="flex justify-between bg-white-fa p-2 rounded">
               <div className="font-bold my-auto mx-2">Available Services</div>
               <div className="flex gap-2">
                  <div>
                     <Dropdown
                        options={[
                           {
                              label: "Date Created",
                              value: "Date Created",
                           },
                           {
                              label: "Project Name",
                              value: "Project Name",
                           },
                        ]}
                        onChange={onBulkActionChange}
                        value={sort}
                        placeholder="Sort Item"
                        dropdownIcon="fa-solid fa-caret-down"
                        itemTemplate={BulkActionOptionTemplate}
                     />
                  </div>
                  <div className="text-gray-500 my-auto">
                     <span className="font-bold text-gray-600">
                        {data?.data?.total}
                     </span>{" "}
                     of {data?.data?.total} items
                  </div>
               </div>
            </div>

            {status === "loading" ? (
               <div className="vh-center">
                  <ProgressSpinner strokeWidth={3} />
               </div>
            ) : status === "success" ? (
               <div className="overflow-hidden divide-y">
                  {data?.data?.data.map((item, index) => (
                     <ServiceItem key={index} data={item} />
                  ))}
               </div>
            ) : (
               <ErrorMessage className="vh-center" error={error} />
            )}
            <div></div>
         </div>
      </>
   );
}
