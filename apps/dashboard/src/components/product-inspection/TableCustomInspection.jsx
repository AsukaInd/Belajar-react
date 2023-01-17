import {
    flexRender,
    getCoreRowModel,
    Sorting,
    useReactTable,
} from "@tanstack/react-table";
import { useState, useMemo, useEffect, useRef } from "react";
import { BulkActionOptionTemplate } from "~/components/BulkActionOptionTemplate";
import { classNames } from "primereact/utils";
import Loading from "./Loading";
import EmptyData from "./EmptyData";
import { RegularButton } from "./Button";
import { tokenStorage } from "~/utils/tokenStorage";
import { Menu } from "primereact/menu";
import { IconEdit } from "~/components/icons/IconEdit";
import { IconDelete } from "~/components/icons/IconDelete";
import { Button } from "primereact/button";
import IconDownload from "../icons/IconDownload";
import IconUpload from "../icons/IconUpload";
import IconAdd from "../icons/IconAdd";
import { Dropdown } from "primereact/dropdown";
import { IndeterminateCheckbox, Table } from "../Table";
import { InputText } from "primereact/inputtext";

const mockInspectionChapterRes = {
    "success": true,
    "data": {
        "current_page": 1,
        "data": [
            {
                "id": 1,
                "inspection": "22-000001 (2022-06-06) [No.123, Tonghui Rd, XIaoshan,Hanghzhou, China]",
                "name": "wormanship2",
                "type": "Workmanship",
                "instruction": "-"
            },
            {
                "id": 2,
                "inspection": "22-000001 (2022-04-29) [address 001 Bengbu, Anhui, China Anhui, China China]",
                "name": "Test 123456",
                "type": "Normal",
                "instruction": "-"
            }
        ],
        "first_page_url": "https://internal.inspxt.com/api/v1/pi/product-inspection-chp?page=1",
        "from": 1,
        "last_page": 1,
        "last_page_url": "https://internal.inspxt.com/api/v1/pi/product-inspection-chp?page=2",
        "links": [
        ],
        "next_page_url": "https://internal.inspxt.com/api/v1/pi/product-inspection-chp?page=2",
        "path": "https://internal.inspxt.com/api/v1/pi/product-inspection-“chp",
        "per_page": 10,
        "prev_page_url": null,
        "to": 2,
        "total": 2
    }
};

export default function TableCustomInspection(props) {
    const searchRef = useRef(null)
    const [allData, setAllData] = useState({
        links: [],
    });
    const [{ pageSize, pageIndex }, setPagination] = useState({
        pageSize: allData.per_page || 20, pageIndex: 1
    })
    const [tableData, setTableData] = useState([]);
    const tableColumns = useMemo(() => props.columns, [props.columns]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);
    const menu = useRef(null);
    const selected = useRef(null);
    const [rowSelection, setRowSelection] = useState({})

    useEffect(() => {
        const getData = async () => {
            props.api.get(pageIndex).then((res) => {
                if (props.title === 'Inspection Chapter') {
                    setAllData(mockInspectionChapterRes.data);
                    setTableData(mockInspectionChapterRes.data.data);
                    setIsEmpty(false);
                    setIsLoading(false);
                } else {
                    setAllData(res.data.data);
                    setTableData(res.data.data.data);
                    if (res.data.data.data.length === 0) {
                        setIsEmpty(true);
                        setIsLoading(false);
                    } else {
                        setIsEmpty(false);
                        setIsLoading(false);
                    }
                }
            });
        };
        getData();
    }, [props.renderData, pageIndex]);

    const items = [
        {
            label: "Edit",
            icon: <IconEdit className="ml-auto flex-order-1" />,
            command() {
                props.editData(selected.current);
            },
        },
        {
            label: "Delete",
            icon: <IconDelete className="ml-auto text-blue-2 flex-order-1" />,
            command() {
                props.delete(selected.current);
            },
        },
    ];

    const column = [
        {
            header: "ID",
            id: "id",
            accessorKey: "id",
        },
        ...tableColumns,
        {
            header: "Action",
            id: "action-button",
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Button
                        icon={<IconEdit className='mr-2'/>}
                        onClick={() => {
                            props.addData(row.id)
                        }}
                        label="Edit"
                        className='bg-[#2854F60D] text-[#2854F6] py-2'
                    />
                    <Button
                        icon={<IconDelete className="mr-2"/>}
                        label="Delete"
                        color="#EB4646"
                        onClick={() => {
                            props.delete(row.id)
                        }}
                        co
                        className='bg-[#EB46460D] text-[#EB4646] hover:!bg-[#EB4646] hover:!text-white-1 py-2'
                    />
                </div>
                // <Button
                //     icon={
                //         <i
                //             className="fa-solid fa-ellipsis"
                //             style={{ color: "var(--secondary-menu-text-color)" }}
                //         ></i>
                //     }
                //     className="p-button-rounded p-button-text"
                //     aria-label="Options"
                //     tooltip="More"
                //     onClick={(event) => {
                //         selected.current = row.original;
                //         menu.current.toggle(event);
                //     }}
                //     aria-haspopup
                //     aria-controls="more-options"
                // />
            ),
        },
    ]

    useEffect(() => {
        console.log("pageSize ", pageSize)
        console.log("pageIndex ", pageIndex)
    }, [pageSize, pageIndex])

    return (
        <div className="layout-content">
            <div className="flex justify-between mt-4 mb-6 items-center">
                <h4 className="text-xl font-bold">{!isLoading && !isEmpty && props.title}</h4>
                <div>
                    { props.customToolbar}
                </div>
            </div>
            <div className="w-full mb-3">
                <span className="p-input-icon-left search w-full">
                    <i className="pi pi-search" />
                    <InputText
                        className="w-full"
                        ref={searchRef}
                        placeholder="Search your inspection here"
                        onKeyUp={(event) => { console.log('search') }}
                        onChange={(event) => { console.log('change') }}
                    />
                </span>
            </div>
            {tableData.length > 0 && (
                <>
                    <Table
                        tableName={props.title}
                        data={allData.data}
                        columns={column}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                        rowSelection={rowSelection}
                        setRowSelection={setRowSelection}
                        setPagination={setPagination}
                        pageCount={allData.last_page}
                        from={allData.from}
                        to={allData.to}
                        sorting={tableColumns.map((data) => data.accessorKey)}
                        setSorting={(data) => console.log(data)}
                        style={{
                            "--nth1Width": "50px",
                            "--nth2Width": "225px",
                            "--totalColumn": "8",
                        }}
                    />
                </>
            )}
            {isLoading && <Loading />}
            {isEmpty && <EmptyData onClick={props.addData} />}

            <Menu
                style={{
                    maxWidth: "125px",
                }}
                model={items}
                popup
                ref={menu}
                id="more-options"
            />
        </div>
    );
}
