import React, { useState } from "react";
import { Dropdown } from "../../../../../../components/product-inspection/DropDown";
import { ProgressSpinner } from "primereact/progressspinner";
import TableProduct from "./TableProduct";
import { useService } from "../../../api/services/service.services";
import Payment from "./Payment";

function Checkout() {
   const [rowSelection, setRowSelection] = useState({});
   const [{ pageIndex, pageSize }, setPagination] = useState({
      pageIndex: 0,
      pageSize: 10,
   });

   const { status, data, error } = useService({
      perPage: pageSize,
      page: pageIndex,
   });
   return (
      <section className="flex flex-col md:flex-row gap-8">
         <div className="w-full md:w-2/3">
            <div className="drop-shadow bg-white rounded-lg  border border-gray-500">
               <div className="flex justify-between bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg">
                  <h1 className="font-bold text-2xl my-auto">
                     Confirm Sample Size
                  </h1>
               </div>
               <div className="p-4">
                  <h6>Sample Size - Workmanship</h6>
                  <Dropdown
                     placeholder="Select sample size"
                     options={[
                        {
                           label: "XL",
                           value: "XL",
                        },
                        {
                           label: "L",
                           value: "L",
                        },
                        {
                           label: "M",
                           value: "M",
                        },
                        {
                           label: "S",
                           value: "S",
                        },
                        {
                           label: "XS",
                           value: "XS",
                        },
                     ]}
                  ></Dropdown>
                  <p className="flex  gap-2 text-sm text-blue-2 my-3">
                     <div className="my-auto">
                        <svg
                           width="12"
                           height="12"
                           viewBox="0 0 10 10"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M0 5C0 7.76142 2.23858 10 5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5ZM6 4V5L6 8V9H4V8L4 5V4H6ZM4 2.5V3.5H6V2.5V2V1H4V2V2.5Z"
                              fill="#2854F6"
                           />
                        </svg>
                     </div>
                     Inspxt will inspect 125 pcs out of 2000
                  </p>

                  <h6>Order Summary</h6>

                  {status === "loading" ? (
                     <div className="vh-center">
                        <ProgressSpinner strokeWidth={3} />
                     </div>
                  ) : status === "success" ? (
                     <TableProduct
                        data={data?.data}
                        rowSelection={rowSelection}
                        setRowSelection={setRowSelection}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                        setPagination={setPagination}
                        pageCount={data?.data?.last_page}
                        from={data?.data?.from}
                        to={data?.data?.to}
                     />
                  ) : (
                     <ErrorMessage className="vh-center" error={error} />
                  )}

                  <h6>Shipping Fee</h6>
                  <div className="flex justify-between border-2 p-3 border-gray-100 rounded-md">
                     <div className="flex flex-col gap-2">
                        <div className="font-bold">Express Booking Fee</div>
                        <div className="text-gray-500">
                           Estimated arrive 4 days
                        </div>
                     </div>
                     <span className="font-bold my-auto">USD 129</span>
                  </div>
               </div>
            </div>
         </div>
         <Payment />
      </section>
   );
}

export default Checkout;
