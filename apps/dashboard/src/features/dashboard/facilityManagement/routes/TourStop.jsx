import { useState } from "react";
import { TourStopTable } from "~/features/dashboard/facilityManagement/tourStop/TourStopTable";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { AddTourStopDialog } from "~/features/dashboard/facilityManagement/tourStop/AddTourStopDialog";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { BulkActionOptionTemplate } from "~/components/BulkActionOptionTemplate";
import { Dropdown } from "primereact/dropdown";
import { IconDelete } from "~/components/icons/IconDelete";
import { AppTopbar } from "~/features/dashboard/layout/AppTopbar";
import { IconLocation } from "~/components/icons/IconLocation";
import { DeleteTourStop } from "~/features/dashboard/facilityManagement/tourStop/DeleteTourStop";
import { useTourStops } from '~/features/dashboard/facilityManagement/hooks/tourStop/useTourStops'
import { ErrorMessage } from "~/components/ErrorMessage";
import { ProgressSpinner } from "primereact/progressspinner";
import { useSites } from '~/features/dashboard/facilityManagement/hooks/site/useSites'
import { Divider } from 'primereact/divider';
import { FaChevronLeft } from "react-icons/fa";

export default function TourStops() {
   const { t } = useTranslation();
   const navigate = useNavigate();
   const [searchParams] = useSearchParams();
   const siteId = searchParams.get("siteId");
   const [newTourStopDialog, setNewTourStopDialog] = useState(false);
   const [deleteDialog, setDeleteDialog] = useState(false);
   const [rowSelection, setRowSelection] = useState([]);

   const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

   const { status, data, error } = useTourStops({ pageSize, page: pageIndex, id: siteId })
   const siteQuery = useSites({ id: siteId, config: { enabled: Boolean(siteId) } })

   function closeNewTourStopDialog() {
      setNewTourStopDialog(false);
   }

   function openNewTourStopDialog() {
      setNewTourStopDialog(true);
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
         <AppTopbar
            left={
               <Button
                  className="hover:brightness-[80%]"
                  style={{
                     background: "var(--secondary-lightest-color)",
                     color: "var(--primary-color)",
                  }}
                  icon={<FaChevronLeft className="mr-2" />}
                  label="Back to site list"
                  onClick={() => navigate("/facility-management/site")}
               />
            }
            right={<h1 className="top-bar-title">Site Configuration</h1>}
         />
         <div className="layout-content">
            <Toolbar
               left={
                  <div className="flex align-items-center">
                     {
                        siteId && siteQuery.isSuccess && (
                           <>
                              <span className="mr-3 font-bold text-xl">
                                 Tour Stops for site:
                              </span>
                              <Button
                                 label={siteQuery.data?.data?.site_name}
                                 className="p-button-outlined mr-3"
                                 style={{
                                    background: "var(--secondary-lightest-color)",
                                 }}
                              />
                           </>
                        )
                     }
                     <Dropdown
                        options={[
                           {
                              label: "Delete",
                              value: "delete",
                              icon: <IconDelete />,
                           },
                        ]}
                        placeholder="Bulk Action"
                        dropdownIcon="fa-solid fa-caret-down"
                        itemTemplate={BulkActionOptionTemplate}
                        onChange={onBulkActionChange}
                     />
                  </div>
               }
               right={
                  <div className="my-2">
                     <Button
                        label="New Tour Stop"
                        className="mr-2"
                        icon={<IconLocation className="mr-2" />}
                        onClick={openNewTourStopDialog}
                     />
                  </div>
               }
            />
            <Divider className="mt-2" />
            {
               status === 'loading'
                  ? (
                     <div className="vh-center">
                        <ProgressSpinner strokeWidth={3} />
                     </div>
                  )
                  : status === 'success'
                     ? (
                        <TourStopTable
                           siteId={siteId}
                           data={data}
                           rowSelection={rowSelection}
                           setRowSelection={setRowSelection}
                           pageIndex={pageIndex}
                           pageSize={pageSize}
                           setPagination={setPagination}
                           pageCount={data?.last_page}
                           from={data?.from}
                           to={data?.to}
                        />
                     ) : <ErrorMessage className="vh-center" error={error} />
            }
         </div>

         <AddTourStopDialog
            isOpen={newTourStopDialog}
            onClose={closeNewTourStopDialog}
         />
         <DeleteTourStop
            isBulkDelete
            setRowSelection={setRowSelection}
            isOpen={deleteDialog}
            onClose={closeDeleteDialog}
            ids={rowSelection}
            siteId={siteId}
         />
      </>
   );
}
