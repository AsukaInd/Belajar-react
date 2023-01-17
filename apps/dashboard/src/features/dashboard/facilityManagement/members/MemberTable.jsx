import { useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { EditMemberDialog } from "./EditMemberDialog";
import { DeleteMember } from "./DeleteMember";
import { useTranslation } from "react-i18next";

function imageBody(rowData) {
   return <img src={rowData.photo} height="100" />;
}

export function MemberTable({ status, error, data }) {
   const { t } = useTranslation();
   const dt = useRef(null);
   const [editMemberDialog, setEditMemberDialog] = useState(false);
   const [deleteDialog, setDeleteDialog] = useState(false);
   const [selected, setSelected] = useState(null);

   function closeEditMemberDialog() {
      setSelected(null);
      setEditMemberDialog(false);
   }

   function openEditMemberDialog(data) {
      setSelected(data);
      setEditMemberDialog(true);
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
               value={data}
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
               <Column field="photo" header="Picture" body={imageBody}></Column>
               <Column
                  field="first_name"
                  header={t("common.first-name")}
                  headerStyle={{ width: "20%" }}
               ></Column>
               <Column
                  field="last_name"
                  header={t("common.last-name")}
                  headerStyle={{ width: "20%" }}
               ></Column>

               <Column
                  field="position_title"
                  header="Position title"
                  headerStyle={{ width: "20%" }}
               ></Column>

               <Column
                  field="email"
                  header="Email"
                  headerStyle={{ width: "20%" }}
               ></Column>

               <Column
                  field="mobile"
                  header="Mobile"
                  headerStyle={{ width: "20%" }}
               ></Column>

               <Column
                  field="phone"
                  header="Phone"
                  headerStyle={{ width: "20%" }}
               ></Column>

               <Column
                  field="status"
                  header="Status"
                  headerStyle={{ width: "20%" }}
               ></Column>
               <Column
                  header={t("common.action")}
                  headerStyle={{ width: "5%" }}
                  body={(data) => {
                     return (
                        <div className="actions flex flex-column">
                           <Button
                              onClick={() => openEditMemberDialog(data)}
                              className="mb-2"
                              label={t("common.edit")}
                           ></Button>
                           <Button
                              className="mb-2"
                              onClick={() => openDeleteDialog(data)}
                              label={t("common.delete")}
                           ></Button>
                        </div>
                     );
                  }}
               ></Column>
            </DataTable>
         ) : error.status < 500 ? (
            error.data.message
         ) : (
            error.textStatus
         )}
         <EditMemberDialog
            isOpen={editMemberDialog}
            onClose={closeEditMemberDialog}
            editMemberData={selected}
         />
         <DeleteMember
            isOpen={deleteDialog}
            onClose={closeDeleteDialog}
            id={selected?.id}
         />
      </>
   );
}
