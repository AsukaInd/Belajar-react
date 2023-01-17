import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import React, { useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { useInspection } from "../hooks/useInspection";

function InspectionList() {
   const [sort, setSort] = useState("");

   const [{ pageIndex, pageSize }, setPagination] = useState({
      pageIndex: 0,
      pageSize: 10,
   });

   function onBulkActionChange(event) {
      setSort(event.value);
   }

   const { status, data, error } = useInspection({
      perPage: pageSize,
      page: pageIndex,
   });
   console.log(data);
   return (
      <div className="max-w-xl mx-auto bg-white-fa min-h-screen">
         <Toolbar
            left={<h1 className="text-xl my-auto">Inspection List</h1>}
            right={
               <div className="flex gap-2">
                  <span className="bg-blue-2 text-white font-medium px-2 py-1 rounded">
                     10
                  </span>
                  <span className="bg-grey-1 text-white font-medium px-2 py-1 rounded">
                     2
                  </span>
               </div>
            }
            className="bg-white-1"
         />
         <Toolbar
            left={
               <span className="p-input-icon-left">
                  <i className="pi pi-search" />
                  <InputText placeholder="Search your item here" />
               </span>
            }
            right={
               <Dropdown
                  options={[
                     {
                        label: "Newest",
                        value: "Newest",
                     },
                     {
                        label: "Oldest",
                        value: "oldest",
                     },
                  ]}
                  onChange={onBulkActionChange}
                  value={sort}
                  placeholder="Sort Item"
                  dropdownIcon="fa-solid fa-caret-down"
               />
            }
            className="bg-white-1"
         />
         <main className="px-4 ">
            {data?.data?.data?.map((item, index) => (
               <a href={`/app/officer/inspection/${item.id}`} key={index}>
                  <div className="my-4 cursor-pointer">
                     <span className="text-sm font-medium text-grey-1">
                        {item.inspect_req_date}
                     </span>
                     <div className="relative border-2 border-gray-100 drop-shadow-md overflow-hidden bg-white rounded-lg p-2">
                        <div className="w-full px-2 flex gap-2 items-center">
                           <div className="flex text-white rounded-full mr-2">
                              <img
                                 // src={`https://gt.immershift.com/backend/storage/app/${data.photo}`}
                                 src="https://picsum.photos/seed/picsum/50/50"
                                 className=" rounded-full bg-green-200"
                                 alt="avatar"
                              />
                           </div>
                           <div className="flex flex-col w-full">
                              <div className="font-bold">
                                 {item?.product?.product_name}
                              </div>
                              <p className="mt-2">{item?.supplier?.company_name} | {item?.supplier?.country_id}</p>
                              <p className="text-grey-1">Quantity {item.qty}</p>
                           </div>
                           <a href={`/app/product-inspection/book-now/`}>
                              <AiOutlineRight csize={20} color="#7A7A7A" />
                           </a>
                        </div>
                     </div>
                  </div>
               </a>
            ))}
         </main>
      </div>
   );
}

export default InspectionList;
