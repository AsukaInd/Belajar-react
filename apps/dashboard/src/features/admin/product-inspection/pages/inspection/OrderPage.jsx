import React, { useState } from "react";
import { Button } from "primereact/button";
import { IconEdit } from "~/components/icons/IconEdit";
import { IconDelete2 } from "~/components/icons/IconDelete2";
import { DeleteModal } from "../../../../../components/product-inspection/DeleteModal";
import apiInspectionOrder from "../../api/inspection/apiInspectionOrder";
import TableCustomInspection from "../../../../../components/product-inspection/TableCustomInspection";
import { useEffect } from "react";
import { CustomToolbar } from "../../components/CustomToolbar";

function OrderPage() {
   const [deleteDialog, setDeleteDialog] = useState(false);
   const [selected, setSelected] = useState(null);
   const [renderData, setRenderData] = useState(false);

   function openDeleteDialog(data) {
      setSelected(data);
      setDeleteDialog(true);
   }

   function closeDeleteDialog() {
      setSelected(null);
      setDeleteDialog(false);
   }
   const columns = [
      {
         header: "Services Type",
         accessorKey: "services",
      },
      {
        header: "PO",
        accessorKey: "services",
     },
     {
        header: "Supplier",
        accessorKey: "services",
     },
     {
        header: "Product Name",
        accessorKey: "services",
     },
     {
        header: "Quantity",
        accessorKey: "services",
     },
     {
        header: "Inspector",
        accessorKey: "services",
     },
     {
        header: "Request Date",
        accessorKey: "services",
     },
     {
        header: "Schedule Date",
        accessorKey: "services",
     },
     {
        header: "Location",
        accessorKey: "services",
     },
     {
        header: "Status",
        accessorKey: "services",
     },
   ];

   const addEditData = (data) => {
      console.log(data);
      if (data === null) {
         window.location.href = "/app/admin/product-inspection/inspection-order/add";
      } else {
         window.location.href = `/app/admin/product-inspection/inspection/${data.id}`;
      }
   };

   const deleteData = async (id) => {
      await apiInspectionOrder.deleteData(id).then(() => {
         setRenderData(!renderData);
         closeDeleteDialog();
      });
   };

   return (
      <>
         <TableCustomInspection
            title="Inspection Order"
            customToolbar={
                <CustomToolbar
                    options={[
                        {label: 'New', value: 'new'},
                        {label: 'Scheduled', value: 'scheduled'},
                        {label: 'Completed', value: 'complete'},
                        {label: 'Archived', value: 'archived'},
                        
                    ]}
                    name="filter"
                    onChange={({name, value}) => console.log(name, value)}
                />
            }
            addBtn="Add Inspection"
            api={apiInspectionOrder}
            renderData={renderData}
            addData={() => addEditData(null)}
            columns={columns}
            style={{
               "--nth1Width": "50px",
               "--nth2Width": "100px",
               "--nth2-font-weight": "normal",
               "--totalColumn": "9",
            }}
         />
         <DeleteModal
            isOpen={deleteDialog}
            onClose={closeDeleteDialog}
            onDelete={deleteData}
            selectedData={selected?.id}
         />
      </>
   );
}

export default OrderPage;