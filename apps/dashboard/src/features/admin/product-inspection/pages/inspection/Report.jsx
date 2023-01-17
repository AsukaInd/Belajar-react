import React, { useState } from "react";
import { Button } from "primereact/button";
import { IconEdit } from "~/components/icons/IconEdit";
import { IconDelete2 } from "~/components/icons/IconDelete2";
import { DeleteModal } from "../../../../../components/product-inspection/DeleteModal";
import apiInspectionOrder from "../../api/inspection/apiInspectionOrder";
import TableCustomInspection from "../../../../../components/product-inspection/TableCustomInspection";
import { useEffect } from "react";
import { CustomToolbar } from "../../components/CustomToolbar";

function Report() {
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
            header: "Project Name",
            accessorKey: "services",
        },
        {
            header: "Description",
            accessorKey: "services",
        },
        {
            header: "Supplier",
            accessorKey: "services",
        },
        {
            header: "Product",
            accessorKey: "services",
        },
        {
            header: "Inspection",
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
            window.location.href = "/app/admin/product-inspection/report/add";
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
                title="Report"
                customToolbar={
                    <CustomToolbar
                        options={[
                            { label: 'Approved', value: 'approved' },
                            { label: 'Archived', value: 'archived' },

                        ]}
                        name="filter"
                        onChange={({ name, value }) => console.log(name, value)}
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

export default Report;
