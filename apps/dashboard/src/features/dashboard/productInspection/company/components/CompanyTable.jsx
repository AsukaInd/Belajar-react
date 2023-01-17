import { useRef, useState, useEffect } from "react";
import { Button } from "primereact/button";
import { EditCompanyDialog } from "./EditCompanyDialog";
import { DeleteCompany } from "./DeleteCompany";
import { useTranslation } from "react-i18next";
import { Table, IndeterminateCheckbox } from "~/components/Table";
import { IconPreviewOpen } from "~/components/icons/IconPreviewOpen";
import { IconDelete } from "~/components/icons/IconDelete";
import { IconEdit } from "~/components/icons/IconEdit";
import { Menu } from "primereact/menu";
import { CompanyFormDialog } from "./CompanyFormDialog";
import { useChangeAssetStatus } from "~/features/dashboard/facilityManagement/hooks/asset/useChangeAssetStatus";
import { Toast } from "primereact/toast";
import { TableInspxt } from "~/components/product-inspection/TableInspxt";
import { Link } from "react-router-dom";

export default function CompanyTable(props) {
   const {
      rowSelection,
      setRowSelection,
      data,
      setPagination,
      pageIndex,
      pageSize,
      pageCount,
      from,
      to,
   } = props;

   const toast = useRef(null);
   const { t } = useTranslation();
   const [editCompany, setEditCompany] = useState(false);
   const [deleteDialog, setDeleteDialog] = useState(false);
   const [isView, setIsView] = useState(false);
   const selected = useRef(null);
   const statusMenuRef = useRef(null);
   const menu = useRef(null);

   const changeStatus = useChangeAssetStatus({
      onError() {
         toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Unknown error",
            life: 3000,
         });
      },
   });

   const items = [
      {
         label: "Detail",
         icon: <IconPreviewOpen className="ml-auto flex-order-1" />,
         command() {
            toggleIsView();
         },
      },
      {
         label: "Edit",
         icon: <IconEdit className="ml-auto flex-order-1" />,
         command() {
            openEditAssetDialog();
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

   function openEditAssetDialog() {
      setEditCompany(true);
   }

   function closeEditAssetDialog() {
      setEditCompany(false);
   }

   function openDeleteDialog() {
      setDeleteDialog(true);
   }

   function closeDeleteDialog() {
      setDeleteDialog(false);
   }

   function toggleIsView() {
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
         header: "Account ID",
         accessorKey: "id",
         enableSorting: false,
      },
      {
         header: "Logo",
         enableSorting: false,
         cell: ({ row }) => (
            <img
               className="image"
               src={`https://internal.inspxt.com/assets/images/${row.original.image}`}
            />
         ),
      },
      {
         header: "Company Name",
         cell: ({ row }) => (
            <span className="font-medium">{row.original.company_name}</span>
         ),
         enableSorting: false,
      },
      // {
      //    header: "Type",
      //    cell: ({ row }) => (
      //       <div className="flex align-items-center font-bold">
      //          <Link to={`#`} className="total-user-view-button">
      //             {row.original.supplier_type}
      //          </Link>
      //       </div>
      //    ),
      // },
      {
         header: "Country",
         cell: ({ row }) => <span>{row.original.country.name}</span>,
      },
      {
         header: "City",
         cell: ({ row }) => <span>{row.original.city.name}</span>,
      },
      {
         header: "Contact Name",
         cell: ({ row }) => <span>{row.original.firstname} {" "} {row.original.contact_name} </span>,
         enableSorting: false,
      },
      {
         header: "Phone Number",
         cell: ({ row }) => <span>{row.original.phone} </span>,
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
                  selected.current = null;
                  selected.current = row.original;
                  menu.current.toggle(event);
               }}
               aria-haspopup
               aria-controls="more-options"
            />
         ),
      },
   ];

   const statusModel = [
      {
         label: "Set Enable",
         className: "set-enable",
         command: (data) => {
            if (selected.current) {
               changeStatus.mutate({
                  id: selected.current.id,
                  status: "enable",
               });
            }
         },
      },
      {
         label: "Set Disable",
         className: "set-disable",
         command: () => {
            if (selected.current) {
               changeStatus.mutate({
                  id: selected.current.id,
                  status: "disable",
               });
            }
         },
      },
   ];

   return (
      <>
         <TableInspxt
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
            className="asset-table"
            totalStickyCol="sticky-col-4"
            style={{
               "--nth1Width": "50px",
               "--nth2Width": "90px",
               "--nth3Width": "75px",
               "--nth4Width": "200px",
               "--totalColumn": "9",
            }}
         />
         <Toast ref={toast} position="top-right" />
         <Menu
            style={{
               maxWidth: "125px",
            }}
            model={items}
            popup
            ref={menu}
            id="more-options"
         />
         <Menu
            popup
            model={statusModel}
            ref={statusMenuRef}
            id="status-menu"
            className="asset-status-menu"
         />
         <DeleteCompany
            isOpen={deleteDialog}
            onClose={closeDeleteDialog}
            id={selected.current?.id}
         />
         <CompanyFormDialog
            isView
            isOpen={isView}
            onClose={toggleIsView}
            editData={selected?.current}
         />
         <EditCompanyDialog
            isOpen={editCompany}
            onClose={closeEditAssetDialog}
            editData={selected?.current}
         />
      </>
   );
}
