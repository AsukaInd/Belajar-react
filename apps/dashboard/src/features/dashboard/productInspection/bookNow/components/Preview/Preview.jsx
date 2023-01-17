import React, { useState } from "react";
import TableProduct from "./TableProduct";
import { IconEdit } from "~/components/icons/IconEdit";
import { Button } from "../../../../../../components/product-inspection/Button";
import InspectionPreview from "./InspectionPreview";
import ChooseInspector from "./ChooseInspector";
import { ProgressSpinner } from "primereact/progressspinner";
import { useService } from "../../../api/services/service.services";

function Preview({ setIsHire, hire, control }) {
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
      <section className="drop-shadow bg-white rounded-lg mt-8 border border-gray-500 pb-4">
         <div className="flex justify-between bg-white-fa border-white-e9 border-b-2 p-4 rounded-t-lg">
            <h1 className="font-bold text-2xl my-auto">Inspection Preview</h1>
         </div>
         <InspectionPreview />
         <b className="p-4 text-lg"> Product Detail</b>

         <div className="p-4">
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
         </div>
         <ChooseInspector
            setIsHire={(e) => setIsHire(e)}
            hire={hire}
            control={control}
         />
      </section>
   );
}

export default Preview;
