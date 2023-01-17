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

export default function TableInspection(props) {
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

    // const table = useReactTable({
    //     data: tableData,
    //     columns: [
    //         {
    //             id: "select",
    //             header: ({ table }) => (
    //                <IndeterminateCheckbox
    //                   {...{
    //                      checked: table.getIsAllRowsSelected(),
    //                      indeterminate: table.getIsSomeRowsSelected(),
    //                      onChange: table.getToggleAllRowsSelectedHandler(),
    //                   }}
    //                />
    //             ),
    //             cell: ({ row }) => (
    //                <div>
    //                   <IndeterminateCheckbox
    //                      {...{
    //                         checked: row.getIsSelected(),
    //                         indeterminate: row.getIsSomeSelected(),
    //                         onChange: row.getToggleSelectedHandler(),
    //                      }}
    //                   />
    //                </div>
    //             ),
    //          },
    //         ...tableColumns,
    //         {
    //             header: "Action",
    //             id: "action-button",
    //             cell: ({ row }) => (
    //                 <Button
    //                     icon={
    //                         <i
    //                             className="fa-solid fa-ellipsis"
    //                             style={{ color: "var(--secondary-menu-text-color)" }}
    //                         ></i>
    //                     }
    //                     className="p-button-rounded p-button-text"
    //                     aria-label="Options"
    //                     tooltip="More"
    //                     onClick={(event) => {
    //                         selected.current = row.original;
    //                         menu.current.toggle(event);
    //                     }}
    //                     aria-haspopup
    //                     aria-controls="more-options"
    //                 />
    //             ),
    //         },
    //     ],
    //     state: {
    //         rowSelection: props.rowSelection ?? [],
    //     },
    //     getCoreRowModel: getCoreRowModel(),
    // });

    // const THead = (
    //     <thead>
    //         {table.getHeaderGroups().map((headerGroup) => (
    //             <tr key={headerGroup.id}>
    //                 {headerGroup.headers.map((header) => {
    //                     return (
    //                         <th
    //                             key={header.id}
    //                             colSpan={header.colSpan}
    //                             className="!bg-white-fa"
    //                         >
    //                             {header.isPlaceholder ? null : (
    //                                 <div
    //                                     onClick={header.column.getToggleSortingHandler()}
    //                                     className={classNames({
    //                                         "cursor-pointer select-none":
    //                                             header.column.getCanSort(),
    //                                     })}
    //                                 >
    //                                     {flexRender(
    //                                         header.column.columnDef.header,
    //                                         header.getContext()
    //                                     )}
    //                                 </div>
    //                             )}
    //                         </th>
    //                     );
    //                 })}
    //             </tr>
    //         ))}
    //     </thead>
    // );

    // const TBody = (
    //     <tbody>
    //         {table.getRowModel().rows.map((row) => {
    //             return (
    //                 <tr key={row.id}>
    //                     {row.getVisibleCells().map((cell) => {
    //                         return (
    //                             <td key={cell.id}>
    //                                 {flexRender(
    //                                     cell.column.columnDef.cell,
    //                                     cell.getContext()
    //                                 )}
    //                             </td>
    //                         );
    //                     })}
    //                 </tr>
    //             );
    //         })}
    //     </tbody>
    // );

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
            header: "ID",
            id: "id",
            accessorKey: "id",
        },
        ...tableColumns,
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
    ]

    useEffect(() => {
        console.log("pageSize ", pageSize)
        console.log("pageIndex ", pageIndex)
    }, [pageSize, pageIndex])

    return (
        <div className="layout-content">
            <div className="flex justify-between my-4 items-center">
                <h4 className="text-xl font-bold">{!isLoading && !isEmpty && props.title}</h4>
                <div className="ml-auto flex gap-2">
                    <RegularButton
                        title={
                            <div className="flex items-center justify-center">
                                <IconDownload />
                                <div className="ml-2">Download</div>
                            </div>
                        }
                        onClick={() => console.log('handle Download')}
                        className="!border-blue-2 border-1 hover:!bg-blue-2 hover:!text-white-1 !text-blue-2 bg-white"
                    />
                    <RegularButton
                        title={
                            <div className="flex items-center justify-center">
                                <IconUpload />
                                <div className="ml-2">Bulk Upload</div>
                            </div>
                        }
                        onClick={() => console.log('handle bulk upload')}
                        className="!border-blue-2 border-1 hover:!bg-blue-2 hover:!text-white-1 !text-blue-2 bg-white"
                    />
                    {tableData.length > 0 && (
                        <RegularButton
                            title={
                                <div className="flex items-center justify-center">
                                    <IconAdd />
                                    <div className="ml-2">{props.addBtn}</div>
                                </div>
                            }
                            onClick={props.addData}
                            className="!bg-blue-2 hover:!bg-blue-800"
                        />
                    )}
                </div>
            </div>
            <div className="mb-4">
                <div className="flex mr-auto gap-2 items-center">
                    <Dropdown
                        options={[
                            {
                                label: "Delete",
                                value: "delete",
                                icon: <IconDelete className="ml-auto text-blue-2 flex-order-1" />,
                            },
                        ]}
                        placeholder="Bulk Action"
                        dropdownIcon="fa-solid fa-caret-down"
                        itemTemplate={BulkActionOptionTemplate}
                        onChange={() => console.log("Hello")}
                    />
                    <Dropdown
                        label=""
                        placeholder="Sort Items"
                        options={[
                            {
                                label: "Name",
                                value: "delete",
                            },
                            {
                                label: "Date",
                                value: "delete",
                            },
                        ]}
                        itemTemplate={BulkActionOptionTemplate}
                    />
                </div>
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
                    {/* <div className={classNames("custom-table")}>
                        <table>
                            {THead}
                            {TBody}
                        </table>
                    </div>
                    <div className="flex justify-between mt-4">
                        <div className="my-auto">
                            Showing{" "}
                            <b>
                                {allData.from} - {allData.to}{" "}
                            </b>
                            of {allData.total} items
                        </div>
                        <div className="flex gap-2">
                            {allData?.links.map((value, index) => {
                                let label = value.label;
                                if (value.label === "&laquo; Previous") {
                                    label = "Previous";
                                }
                                if (value.label === "Next &raquo;") {
                                    label = "Next";
                                }
                                return (
                                    <div
                                        key={index}
                                        className={`${value.active ? "!text-[#7A7A7A]" : "!text-[#242323] "
                                            } text-white p-2 rounded-lg cursor-pointer bg-[#F4F4F4] border-2 border-[#E9E9E9]`}
                                        onClick={() =>
                                            value.url !== null &&
                                            setNumberPage(value.url.split("=")[1])
                                        }
                                    >
                                        {label}
                                    </div>
                                );
                            })}
                        </div>
                    </div> */}
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
