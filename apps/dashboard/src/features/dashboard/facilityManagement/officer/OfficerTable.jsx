import { useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { EditOfficerDialog } from "./EditOfficerDialog";
import { DeleteOfficer } from "./DeleteOfficer";
import { useOfficers } from "../hooks/officer/useOfficers";
import { useTranslation } from "react-i18next";

const isSupervisorBodyTemplate = (rowData) => {
   return rowData.is_supervisor ? "Yes" : "no";
};

export function OfficerTable() {
   const { t } = useTranslation();
   const dt = useRef(null);
   const [editOfficerDialog, setEditOfficerDialog] = useState(false);
   const [deleteDialog, setDeleteDialog] = useState(false);
   const [selected, setSelected] = useState(null);
   const { status, data } = useOfficers();

   function closeEditOfficerDialog() {
      setSelected(null);
      setEditOfficerDialog(false);
   }

   function openEditOfficerDialog(data) {
      setSelected(data);
      setEditOfficerDialog(true);
   }

   function openDeleteDialog(data) {
      setSelected(data);
      setDeleteDialog(true);
   }

   function closeDeleteDialog() {
      setSelected(null);
      setDeleteDialog(false);
   }

   return (
      <>
         {status === "loading" ? (
            <h1>loading...</h1>
         ) : status === "success" ? (
            <DataTable
               ref={dt}
               value={data.data}
               dataKey="id"
               paginator
               rows={5}
               rowsPerPageOptions={[5, 10, 25]}
               className="datatable-responsive"
               paginatorTemplate="FirstPageLink PrevPageLink NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
               currentPageReportTemplate="{first} - {last} of {totalRecords}"
               emptyMessage={t("common.no-data")}
               responsiveLayout="scroll"
            >
               <Column
                  field="username"
                  header={t("common.username")}
                  headerStyle={{ width: "15%" }}
               ></Column>
               <Column
                  field="first_name"
                  header={t("common.first-name")}
                  headerStyle={{ width: "15%" }}
               ></Column>
               <Column
                  field="last_name"
                  header={t("common.last-name")}
                  headerStyle={{ width: "15%" }}
               ></Column>
               <Column
                  field="is_supervisor"
                  header={t("dashboard.officer.is-supervisor")}
                  body={isSupervisorBodyTemplate}
                  headerStyle={{ width: "15%" }}
               ></Column>
               <Column
                  field="city"
                  header={t("dashboard.officer.city")}
                  headerStyle={{ width: "15%" }}
               ></Column>
               <Column
                  field="state"
                  header={t("dashboard.officer.state")}
                  headerStyle={{ width: "15%" }}
               ></Column>
               <Column
                  field="timezone"
                  header={t("dashboard.officer.timezone")}
                  headerStyle={{ width: "15%" }}
               ></Column>
               <Column
                  header={t("common.action")}
                  body={(data) => {
                     return (
                        <div className="actions flex flex-column">
                           <Button
                              className="mb-2 mx-auto"
                              label={t("common.edit")}
                              onClick={() => openEditOfficerDialog(data)}
                           ></Button>
                           <Button
                              className="mb-2 mx-auto"
                              label={t("common.delete")}
                              onClick={() => openDeleteDialog(data)}
                           ></Button>
                        </div>
                     );
                  }}
               ></Column>
            </DataTable>
         ) : null}

         <EditOfficerDialog
            isOpen={editOfficerDialog}
            onClose={closeEditOfficerDialog}
            editOfficerData={selected}
         />
         <DeleteOfficer
            isOpen={deleteDialog}
            onClose={closeDeleteDialog}
            id={selected?.id}
         />
      </>
   );
}
