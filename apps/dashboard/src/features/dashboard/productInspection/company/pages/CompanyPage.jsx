import React, { useState } from "react";
import CompanyTable from "../components/CompanyTable";
import FilterCompany from "../components/FilterCompany";
import { useService } from "../../api/services/service.services";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toolbar } from "primereact/toolbar";
import { AddCompanyDialog } from "../components/AddCompanyDialog";
import { useCompany } from "../../api/services/company.services";
import { ErrorMessage } from "~/components/ErrorMessage";

function CompanyPage() {
   const [rowSelection, setRowSelection] = useState({});
   const [{ pageIndex, pageSize }, setPagination] = useState({
      pageIndex: 0,
      pageSize: 10,
   });

   const { status, data, error } = useCompany({
      perPage: pageSize,
      page: pageIndex,
   });

   const [newCompanyDialog, setNewCompanyDialog] = useState(false);

   function openNewCompanyDialog() {
      setNewCompanyDialog(true);
   }

   function closeNewCompanyDialog() {
      setNewCompanyDialog(false);
   }

   return (
      <div className="layout-content">
         <Toolbar
            left={<h1 className="text-3xl my-auto">Company</h1>}
            right={
               <button
                  className={`flex bg-blue-2 text-white  font-bold p-3 border-0 rounded cursor-pointer`}
                  onClick={openNewCompanyDialog}
               >
                  <img
                     src="/icons/add.svg"
                     className="my-auto mr-2"
                     alt="plus"
                  />
                  <span className="my-auto"> Add New Company</span>
               </button>
            }
         />
         <FilterCompany />
         {status === "loading" ? (
            <div className="vh-center">
               <ProgressSpinner strokeWidth={3} />
            </div>
         ) : status === "success" ? (
            <CompanyTable
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

         <AddCompanyDialog
            isOpen={newCompanyDialog}
            onClose={closeNewCompanyDialog}
         />
      </div>
   );
}

export default CompanyPage;
