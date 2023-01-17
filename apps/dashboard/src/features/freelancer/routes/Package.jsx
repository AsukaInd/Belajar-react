import { PackageTable } from "../gigs/PackageTable";
import { useTranslation } from "react-i18next";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { AddGigs } from "../gigs/AddGigs";
import { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { AppTopbar } from "~/features/freelancer/layout/AppTopbar";
import { MenuFilter } from "~/components/MenuFilter";
import { IconUserPlus } from "~/components/icons/IconUserPlus";
import { IconDelete } from "~/components/icons/IconDelete";
import { DeleteGigs } from "~/features/freelancer/gigs/DeleteGigs";
import { ProgressSpinner } from "primereact/progressspinner";
import { useDetailGigs } from "../hooks/gigs/useDetailGigs";
import { BulkActionOptionTemplate } from "~/components/BulkActionOptionTemplate";
import { ErrorMessage } from "~/components/ErrorMessage";

export default function Package() {
   const [newGigsDialog, setNewGigsDialog] = useState(false);
   const [deleteDialog, setDeleteDialog] = useState(false);
   const [rowSelection, setRowSelection] = useState({});

   const { status, data, error } = useDetailGigs();

   function closeNewGigsDialog() {
      setNewGigsDialog(false);
   }

   function openNewGigsDialog() {
      setNewGigsDialog(true);
   }

   function openDeleteDialog() {
      setDeleteDialog(true);
   }

   function closeDeleteDialog() {
      setDeleteDialog(false);
   }

   function onBulkActionChange(event) {
      if (event.value === "delete") {
         openDeleteDialog();
      }
   }

   return (
      <>
         {status === "loading" ? (
            <div className="vh-center">
               <ProgressSpinner strokeWidth={3} />
            </div>
         ) : status === "success" ? (
            <>
               <AppTopbar
                  left={<h1 className="top-bar-title">Gigs Setup</h1>}
                  right={
                     <span className="p-input-icon-left search-Gigs search">
                        <i className="pi pi-search" />
                        <InputText placeholder="Search your Gigs here" />
                     </span>
                  }
               />
               <div className="layout-content">
                  <div>
                     <Toolbar
                        left={
                           <h1 className="mb-0" style={{ fontSize: "18px" }}>
                              List of Packages
                           </h1>
                        }
                        right={
                           <div>
                              <Button
                                 icon={<IconUserPlus className="mr-2" />}
                                 label="New Gigs"
                                 onClick={openNewGigsDialog}
                              />
                           </div>
                        }
                     />
                     <Toolbar
                        left={
                           <Dropdown
                              options={[
                                 {
                                    label: "Delete",
                                    value: "delete",
                                    icon: <IconDelete />,
                                 },
                              ]}
                              onChange={onBulkActionChange}
                              placeholder="Bulk Action"
                              dropdownIcon="fa-solid fa-caret-down"
                              itemTemplate={BulkActionOptionTemplate}
                           />
                        }
                     />
                     <PackageTable
                        data={data}
                        rowSelection={rowSelection}
                        setRowSelection={setRowSelection}
                     />
                  </div>
               </div>
            </>
         ) : (
            <ErrorMessage className="vh-center" error={error} />
         )}
         <AddGigs
            isOpen={newGigsDialog}
            onClose={closeNewGigsDialog}
         />
         <DeleteGigs
            bulkDelete
            isOpen={deleteDialog}
            onClose={closeDeleteDialog}
            id={rowSelection}
         />
      </>
   );
}