import { useRef, useState, useEffect } from "react";
import { Button } from "primereact/button";
import { EditGigs } from "./EditGigs";
import { DeleteGigs } from "./DeleteGigs";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Table, IndeterminateCheckbox } from "~/components/Table";
import { IconPreviewOpen } from "~/components/icons/IconPreviewOpen";
import { IconDelete } from "~/components/icons/IconDelete";
import { IconEdit } from "~/components/icons/IconEdit";
import { Menu } from "primereact/menu";

export function GigsTable(props) {
   const {
      rowSelection,
      setRowSelection,
      data,
      setPagination,
      pageIndex,
      pageSize,
      pageCount,
      from,
      to
   } = props

   const { t } = useTranslation();
   const [editGigsDialog, setEditGigsDialog] = useState(false);
   const [deleteDialog, setDeleteDialog] = useState(false);
   const [isView, setIsView] = useState(false);
   const selected = useRef(null);
   const [reactiveSelected, setReactiveSelected] = useState(null);
   const menu = useRef(null);

   useEffect(() => {
      if (reactiveSelected) {
         setReactiveSelected(
            data.data.filter(
               (updatedData) => updatedData.id === reactiveSelected?.id
            )[0]
         );
      }
   }, [data]);

   const items = [
      // {
      //    label: "Edit",
      //    icon: <IconEdit className="ml-auto flex-order-1" />,
      //    command() {
      //       openEditGigsDialog();
      //    },
      // },
      {
         label: "Delete",
         icon: <IconDelete className="ml-auto flex-order-1" />,
         command() {
            openDeleteDialog();
         },
      },
   ];

   function openEditGigsDialog() {
      setEditGigsDialog(true);
      setReactiveSelected(selected.current);
   }

   function closeEditGigsDialog() {
      selected.current = null;
      setReactiveSelected(null);
      setEditGigsDialog(false);
      setIsView(false);
   }

   function openDeleteDialog() {
      setDeleteDialog(true);
   }

   function closeDeleteDialog() {
      selected.current = null;
      setReactiveSelected(null);
      setDeleteDialog(false);
   }

   function updateIsView() {
      setIsView((prev) => !prev);
   }

   const columns = [
      {
         id: "select",
         header: ({ table }) => (
            <IndeterminateCheckbox
               {...{
                  checked: table.getIsAllRowsSelected(),
                  indeterminate: table.getIsSomeRowsSelected(),
                  onChange: table.getToggleAllRowsSelectedHandler(),
               }}
            />
         ),
         cell: ({ row }) => (
            <div>
               <IndeterminateCheckbox
                  {...{
                     checked: row.getIsSelected(),
                     indeterminate: row.getIsSomeSelected(),
                     onChange: row.getToggleSelectedHandler(),
                  }}
               />
            </div>
         ),
      },
      {
         header: "Title",
         cell: ({ row }) => {
            const value = row.original;
            return (
               <div className="flex align-items-center">
                  <span>{value.title}</span>
               </div>
            );
         },
      },
      {
         header: "ID",
         accessorFn: (row) => row.id,
         enableSorting: false,
      },
      {
         header: "SEO Title",
         cell: ({ row }) => {
            const value = row.original;
            return (
               <div className="flex align-items-center">
                  <span>{value.seo_title}</span>
               </div>
            );
         },
      },
      {
         header: "Description",
         cell: ({ row }) => {
            const value = row.original;
            return (
               <div className="flex align-items-center">
                  <span>{value.description}</span>
               </div>
            );
         },
      },
      // {
      //    header: "Show Package",
      //    cell: ({ row }) => {
      //       return (
      //          <div className="flex align-items-center">
      //             <Link
      //                to={`${row?.original?.id}`}
      //                className="package-gigs-button"
      //             >
      //                <IconPreviewOpen className="mr-1" />
      //                Show Package
      //             </Link>
      //          </div>
      //       );
      //    },
      // },
      {
         header: "Action",
         id: "action-button",
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
                  selected.current = row.original;
                  menu.current.toggle(event);
               }}
               aria-haspopup
               aria-controls="more-options"
            />
         ),
      },
   ];

   return (
      <>
         <Table
            hidePagination
            tableName="Gigs"
            data={data}
            columns={columns}
            pageIndex={pageIndex}
            pageSize={pageSize}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            setPagination={setPagination}
            pageCount={pageCount}
            from={from}
            to={to}
            className="Gigs-table"
            style={{
               "--nth1Width": "50px",
               "--nth2Width": "225px",
               "--totalColumn": "11",
            }}
         />
         <Menu
            style={{
               maxWidth: "125px",
            }}
            model={items}
            popup
            ref={menu}
            id="more-options"
         />
         <DeleteGigs
            isOpen={deleteDialog}
            onClose={closeDeleteDialog}
            id={selected.current?.id}
         />
         <EditGigs
            isOpen={editGigsDialog}
            onClose={closeEditGigsDialog}
            editGigsData={reactiveSelected}
            isView={isView}
            editForm={updateIsView}
         />
      </>
   );
}