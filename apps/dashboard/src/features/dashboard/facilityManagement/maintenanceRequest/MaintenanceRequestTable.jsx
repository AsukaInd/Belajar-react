import { useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { useReports } from "../hooks/useReports";
import { formatDate } from "~/utils/formatDate";
import { MaintenanceRequestDetails } from "./MaintenanceRequestDetails";

const dataEnteredBody = (rowData) => {
   return formatDate(rowData.created_at);
};

const officerBody = (rowData) => {
   return `${rowData.officer.first_name} ${rowData.officer.last_name}`;
};

export function MaintenanceRequestTable() {
   const { t } = useTranslation();
   const dt = useRef(null);
   const [isOpen, setIsOpen] = useState(false);
   const [selected, setSelected] = useState(null);
   const { status, data } = useReports({ name: "maintenance-request" });

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
                  header={t("common.date-entered")}
                  body={dataEnteredBody}
                  headerStyle={{ width: "28%" }}
               ></Column>
               <Column
                  field="sites.site_name"
                  header={t("common.site")}
                  headerStyle={{ width: "28%" }}
               ></Column>
               <Column
                  field="officer.first_name"
                  header={t("common.officer")}
                  body={officerBody}
                  headerStyle={{ width: "28%" }}
               ></Column>
               <Column
                  field="type.name"
                  header={t("common.type")}
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
                              label={t("common.details")}
                           ></Button>
                        </div>
                     );
                  }}
               ></Column>
            </DataTable>
         ) : null}
         <MaintenanceRequestDetails
            isOpen={isOpen}
            onClose={closeDetails}
            detailsData={selected}
         />
      </>
   );
}
