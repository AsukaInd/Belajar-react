import { useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { useReports } from "../hooks/useReports";
import { formatDate } from "~/utils/formatDate";
import { DailyActivityDetails } from "./DailyActivityDetails";

const dataEnteredBody = (rowData) => {
   return formatDate(rowData.created_at);
};

const officerBody = (rowData) => {
   return `${rowData.officer.first_name} ${rowData.officer.last_name}`;
};

export function DailyActivityTable() {
   const { t } = useTranslation();
   const dt = useRef(null);
   const [isOpen, setIsOpen] = useState(false);
   const [selected, setSelected] = useState(null);
   const { status, data } = useReports({ name: "daily-activity" });

   function openDetails(data) {
      setSelected(data);
      setIsOpen(true);
   }

   function closeDetails() {
      setSelected(null);
      setIsOpen(false);
   }

   return (
      <>
         {status === "loading" ? (
            <p>loading...</p>
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
                  field="created_at"
                  header="Data entered"
                  body={dataEnteredBody}
                  headerStyle={{ width: "28%" }}
               ></Column>
               <Column
                  field="sites.site_name"
                  header="Site"
                  headerStyle={{ width: "28%" }}
               ></Column>
               <Column
                  field="officer.first_name"
                  header="Officer"
                  body={officerBody}
                  headerStyle={{ width: "28%" }}
               ></Column>
               <Column
                  field="post_shift"
                  header="Post/Shift"
                  headerStyle={{ width: "28%" }}
               ></Column>
               <Column
                  header={t("common.action")}
                  body={(data) => {
                     return (
                        <div className="actions flex flex-column">
                           <Button
                              onClick={() => openDetails(data)}
                              className="mb-2 mx-auto"
                              label="Details"
                           ></Button>
                        </div>
                     );
                  }}
               ></Column>
            </DataTable>
         ) : null}
         <DailyActivityDetails
            isOpen={isOpen}
            onClose={closeDetails}
            detailsData={selected}
         />
      </>
   );
}
