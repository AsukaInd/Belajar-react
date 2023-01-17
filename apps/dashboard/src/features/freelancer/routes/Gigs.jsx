import { GigsTable } from "../gigs/GigsTable";
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
import { useGigs } from "../hooks/gigs/useGigs";
import { BulkActionOptionTemplate } from "~/components/BulkActionOptionTemplate";
import { ErrorMessage } from "~/components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";

export default function Gigs() {
   const countryFilterRef = useRef(null);
   const industryFilterRef = useRef(null);
   const [newGigsDialog, setNewGigsDialog] = useState(false);
   const [deleteDialog, setDeleteDialog] = useState(false);
   const [rowSelection, setRowSelection] = useState({});
   const navigate = useNavigate()

   const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

   const { status, data, error } = useGigs({ perPage: pageSize, page: pageIndex });

   const profileQuery = useProfile()

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
         {profileQuery.status === "loading" ? (
            <div className="vh-center">
               <ProgressSpinner strokeWidth={3} />
            </div>
         ) : profileQuery.status === "success" ? (
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
                              List of Gigs
                           </h1>
                        }
                        right={
                           <div>
                              <Button
                                 icon={<IconUserPlus className="mr-2" />}
                                 label="New Gigs"
                                 onClick={() => navigate('/freelancer/gigs/1')}
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
                     <GigsTable
                        data={profileQuery?.data?.data?.gig}
                        rowSelection={rowSelection}
                        setRowSelection={setRowSelection}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                        setPagination={setPagination}
                        pageCount={data?.last_page}
                        from={data?.from}
                        to={data?.to}
                     />
                  </div>
               </div>
            </>
         ) : (
            <ErrorMessage className="vh-center" error={profileQuery.error} />
         )}
         <AddGigs
            isOpen={newGigsDialog}
            onClose={closeNewGigsDialog}
         />
         <MenuFilter
            ref={countryFilterRef}
            id="country-filter-panel"
            listData={[]}
         />
         <MenuFilter
            ref={industryFilterRef}
            id="industry-filter-panel"
            listData={[]}
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