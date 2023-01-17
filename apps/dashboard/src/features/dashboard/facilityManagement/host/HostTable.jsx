import { useRef, useState, useEffect } from "react";
import { Button } from "primereact/button";
import { EditHostDialog } from "./EditHostDialog";
import { DeleteHost } from "./DeleteHost";
import { Table } from "~/components/Table";
import { IconDelete } from "~/components/icons/IconDelete";
import { IconEdit } from "~/components/icons/IconEdit";
import { Menu } from "primereact/menu";

export function HostTable(props) {
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

   const [editHostDialog, setEditHostDialog] = useState(false);
   const [deleteDialog, setDeleteDialog] = useState(false);
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
      {
         label: "Edit",
         icon: <IconEdit className="ml-auto flex-order-1" />,
         command() {
            openEditHostDialog();
         },
      },
      {
         label: "Delete",
         icon: <IconDelete className="ml-auto flex-order-1" />,
         command() {
            openDeleteDialog();
         },
      },
   ];

   function openEditHostDialog() {
      setEditHostDialog(true);
      setReactiveSelected(selected.current);
   }

   function closeEditHostDialog() {
      selected.current = null;
      setReactiveSelected(null);
      setEditHostDialog(false);
   }

   function openDeleteDialog() {
      setDeleteDialog(true);
   }

   function closeDeleteDialog() {
      selected.current = null;
      setReactiveSelected(null);
      setDeleteDialog(false);
   }

   const columns = [
      {
         header: "ID",
         accessorFn: (row) => row.id,
         enableSorting: false,
      },
      {
         header: "Image",
         cell: ({ row }) => {
            const value = row.original;
            return (
               <img
                  className="object-cover h-[30px] w-[30px] rounded-md"
                  src={value.image}
               />
            );
         },
      },
      {
         header: "First Name",
         accessorFn: (row) => row.first_name,
      },
      {
         header: "Last Name",
         accessorFn: (row) => row.last_name,
      },
      {
         header: "Company",
         accessorKey: "company",
      },
      {
         header: "Job Title",
         accessorKey: "job_title",
      },
      {
         accessorKey: "phone",
         header: "Phone No",
         enableSorting: false,
      },
      {
         header: "Email",
         accessorKey: "email",
         enableSorting: false,
      },
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
            tableName="Host"
            data={data?.data}
            columns={columns}
            pageIndex={pageIndex}
            pageSize={pageSize}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            setPagination={setPagination}
            pageCount={pageCount}
            from={from}
            to={to}
            style={{
               "--nth1Width": "45px",
               "--nth2Width": "65px",
               "--nth2Left": '45px',
               "--totalColumn": "9",
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
         <DeleteHost
            isOpen={deleteDialog}
            onClose={closeDeleteDialog}
            id={selected.current?.id}
            siteId={selected.current?.site_id}
         />
         <EditHostDialog
            isOpen={editHostDialog}
            onClose={closeEditHostDialog}
            editData={reactiveSelected}
         />
      </>
   );
}
