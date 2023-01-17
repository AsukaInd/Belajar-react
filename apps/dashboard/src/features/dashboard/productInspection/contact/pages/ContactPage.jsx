import React, { useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toolbar } from "primereact/toolbar";
import { AddContactDialog } from "../components/AddContactDialog";
import ContactTable from "../components/ContactTable";
import FilterContact from "../components/FilterContact";
import { ErrorMessage } from "~/components/ErrorMessage";
import { useContact } from "../../api/services/contact.services";

function ContactPage() {
   const [rowSelection, setRowSelection] = useState({});
   const [{ pageIndex, pageSize }, setPagination] = useState({
      pageIndex: 0,
      pageSize: 10,
   });

   const { status, data, error } = useContact({
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
            left={<h1 className="text-3xl my-auto">Contact</h1>}
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
                  <span className="my-auto"> Add New Contact</span>
               </button>
            }
         />
         <FilterContact />
         {status === "loading" ? (
            <div className="vh-center">
               <ProgressSpinner strokeWidth={3} />
            </div>
         ) : status === "success" ? (
            <ContactTable
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

         <AddContactDialog
            isOpen={newCompanyDialog}
            onClose={closeNewCompanyDialog}
         />
      </div>
   );
}

export default ContactPage
