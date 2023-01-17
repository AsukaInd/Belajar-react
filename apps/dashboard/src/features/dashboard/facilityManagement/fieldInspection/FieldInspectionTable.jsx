import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import { Table, IndeterminateCheckbox } from "~/components/Table";
import { IconPreviewOpen } from "~/components/icons/IconPreviewOpen";
import { IconDelete } from "~/components/icons/IconDelete";
import { Menu } from "primereact/menu";
import { formatDate } from "~/utils/formatDate";
import { sliceText } from "~/utils/sliceText";
import { FieldInspectionDetail } from "./FieldInspectionDetail";
import { ViewQuestionDialog } from "./ViewQuestionDialog";

export function FieldInspectionTable({ rowSelection, setRowSelection, data }) {
   const { t } = useTranslation();
   const [fieldInspectionDialog, setFieldInspectionDialog] = useState(false);
   const [questionDetailDialog, setQuestionDetailDialog] = useState(false);
   const selected = useRef(null);
   const end_menu = useRef(null);

   const end_items = [
      {
         label: "Detail",
         icon: <IconPreviewOpen className="ml-auto flex-order-1" />,
         command() {
            openFieldInspectionDialog();
         },
      },
   ];

   function openFieldInspectionDialog() {
      setFieldInspectionDialog(true);
   }

   function closeFieldInspectionDialog() {
      setFieldInspectionDialog(false);
   }

   function openQuestionDetailDialog(row) {
      selected.current = null;
      selected.current = row.original;
      setQuestionDetailDialog(true);
   }

   function closeQuestionDetailDialog() {
      setQuestionDetailDialog(false);
   }

   const columns = [
      {
         header: "Date Entered",
         accessorFn: (row) => formatDate(row.created_at),
      },
      {
         header: "Task Name",
         enableSorting: false,
         accessorFn: (row) => sliceText({ text: row.task_name, limit: 20 }),
      },
      {
         header: "Assignee",
         accessorKey: "assignee",
         cell: ({ row }) => {
            const value = row.original;
            return (
               <div className="flex align-items-center">
                  <img
                     className="rounded-full mr-3"
                     width="24"
                     height="24"
                     src={value.assignee.image}
                  />
                  <span className="text-[#005AA6]">{value.assignee.name}</span>
               </div>
            );
         },
      },
      {
         header: "Site",
         accessorKey: "site",
         enableSorting: false,
      },
      {
         header: "Inspected Officer",
         accessorKey: "inspected_officer.name",
         cell: ({ row }) => {
            const value = row.original;
            return (
               <div className="flex align-items-center">
                  <img
                     className="rounded-full mr-3"
                     width="24"
                     height="24"
                     src={value.inspected_officer.image}
                  />
                  <span className="text-[#005AA6]">{value.inspected_officer.name}</span>
               </div>
            );
         },
      },
      {
         header: "Asset",
         accessorKey: "asset",
         enableSorting: false,
      },
      {
         header: "Information",
         cell: ({ row }) => {
            const length = row.original?.questions?.length;
            return (
               <div className="flex align-items-center">
                  <span className="mr-3">{length ?? 0} Questions</span>
                  <button
                     className="border-none cursor-pointer total-user-view-button hover:brightness-[95%]"
                     onClick={() => openQuestionDetailDialog(row)}
                  >
                     <IconPreviewOpen className="mr-1" />
                     <span>View</span>
                  </button>
               </div>
            );
         },
      },
      {
         header: "Comments",
         accessorFn: (row) => sliceText({ text: row.comments }),
         enableSorting: false,
      },
      {
         header: "Action",
         id: "action-button-2",
         cell: ({ row }) => (
            <Button
               icon={
                  <i
                     className="fa-solid fa-ellipsis"
                     style={{ color: "var(--secondary-menu-text-color)" }}
                  ></i>
               }
               className="p-button-rounded p-button-text"
               aria-label="Options"
               tooltip="More"
               onClick={(event) => {
                  selected.current = null;
                  selected.current = row.original;
                  end_menu.current.toggle(event);
               }}
               aria-haspopup
               aria-controls="end-more-options"
            />
         ),
      },
   ];

   return (
      <>
         <Table
            tableName="Field inspection"
            data={data?.data}
            columns={columns}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            totalStickyCol="sticky-col-4"
            style={{
               "--nth1Width": "136px",
               "--nth2Width": "110px",
               "--nth3Width": "130px",
               "--totalColumn": "9",
            }}
         />
         <Menu
            style={{
               maxWidth: "125px",
            }}
            model={end_items}
            popup
            ref={end_menu}
            id="end-more-options"
         />
         <FieldInspectionDetail
            isOpen={fieldInspectionDialog}
            onClose={closeFieldInspectionDialog}
            inspectionData={selected?.current}
         />
         <ViewQuestionDialog
            isOpen={questionDetailDialog}
            onClose={closeQuestionDetailDialog}
            questions={selected?.current?.questions}
         />
      </>
   );
}
