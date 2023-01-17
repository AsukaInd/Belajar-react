import {
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getSortedRowModel,
   useReactTable,
} from "@tanstack/react-table";
import { useState, useMemo, useRef, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { classNames } from "primereact/utils";

export function Table(props) {
   const tableData = useMemo(() => props.data, [props.data]);
   const tableColumns = useMemo(() => props.columns, [props.columns]);

   const tableWrapperRef = useRef(null)
   const tableRef = useRef(null)

   const pagination = useMemo(
      () => ({
         pageIndex: props.pageIndex -1,
         pageSize: props.pageSize
      }),
      [props.pageIndex, props.pageSize]
   )

   const getRowId = (row) => {
      return row.id;
   }

   const table = useReactTable({
      data: tableData,
      columns: tableColumns,
      state: {
         rowSelection: props.rowSelection ?? [],
         pagination,
         sorting: props.sorting,
      },
      pageCount: props.pageCount + 1,
      manualPagination: true,
      onPaginationChange: props.setPagination,
      onSortingChange: props.setSorting,
      onRowSelectionChange: props.setRowSelection ?? null,
      manualSorting: false,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getRowId
   });

   const isEmpty = table.getRowModel().rows.length === 0;

   const THead = (
      <thead>
         {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
               {headerGroup.headers.map((header) => {
                  return (
                     <th key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                           <div
                              onClick={header.column.getToggleSortingHandler()}
                              className={classNames({
                                 "cursor-pointer select-none":
                                    header.column.getCanSort(),
                              })}
                           >
                              {flexRender(
                                 header.column.columnDef.header,
                                 header.getContext()
                              )}
                              {header.column.getCanSort() && (
                                 <span
                                    className="ml-3"
                                    style={{ color: "#D3D3D3" }}
                                 >
                                    {header.column.getIsSorted() === "asc" ? (
                                       <i className="fa-solid fa-sort-up"></i>
                                    ) : header.column.getIsSorted() ===
                                       "desc" ? (
                                       <i className="fa-solid fa-sort-down"></i>
                                    ) : (
                                       <i className="fa-solid fa-sort"></i>
                                    )}
                                 </span>
                              )}
                           </div>
                        )}
                     </th>
                  );
               })}
            </tr>
         ))}
      </thead>
   );

   const TBody = (
      <tbody>
         {
            table.getRowModel().rows.map((row) => {
               return (
                  <tr key={row.id}>
                     {row.getVisibleCells().map((cell) => {
                        return (
                           <td key={cell.id}>
                              {flexRender(
                                 cell.column.columnDef.cell,
                                 cell.getContext()
                              )}
                           </td>
                        );
                     })}
                  </tr>
               );
            })
         }
      </tbody>
   );

   useEffect(() => {
      if (tableWrapperRef.current) {

         function onResize() {
            const tableWrapperSize = tableWrapperRef.current.getBoundingClientRect()
            const tableSize = tableRef.current.getBoundingClientRect()

            if (tableWrapperSize.width > tableSize.width) {
               tableRef.current.classList.add('disable-shadow')
            } else {
               tableRef.current.classList.remove('disable-shadow')
            }
         }

         onResize()

         window.addEventListener('resize', onResize)

         return () => {
            window.removeEventListener('resize', onResize)
         }
      }
   }, [])

   return (
      <div>
         {
            isEmpty
               ? <span className="text-center w-full block mt-6">No data found</span>
               : (
                  <>
                     <div
                        ref={tableWrapperRef}
                        className={classNames("custom-table", [
                           !isEmpty ? `${props.totalStickyCol ?? 'sticky-col-2'}` : "",
                        ])}
                     >
                        <table
                           ref={tableRef}
                           className={classNames('enable-shadow', props.className)}
                           style={props.style}
                        >
                           {THead}
                           {TBody}
                        </table>
                     </div>
                     {
                        !props.hidePagination
                           ? (
                              <div className="flex align-items-center justify-content-between mt-4">
                                 <div className="flex">
                                    <div
                                       className="flex align-items-center text-sm mr-2"
                                       style={{ color: "var(--accent-text-color)" }}
                                    >
                                       <span>Showing</span>
                                       <b
                                          className="mx-1"
                                          style={{ color: "var(--secondary-menu-text-color)" }}
                                       >
                                          {props.from}-{props.to}
                                       </b>
                                       <span>{props.tableName}</span>
                                    </div>
                                    <Dropdown
                                       appendTo="self"
                                       className="pagination-page-size"
                                       options={[5, 10].map((pageSize) => {
                                          return { label: pageSize, value: pageSize };
                                       })}
                                       placeholder={props.pageSize}
                                       value={table.getState().pagination.pageSize}
                                       onChange={(e) => {
                                          table.setPageSize(Number(e.target.value));
                                       }}
                                       dropdownIcon="fa-solid fa-caret-down"
                                    />
                                 </div>
                                 <div className="pagination-next-prev">
                                    <Button
                                       className="mr-3"
                                       onClick={() => table.previousPage()}
                                       disabled={!table.getCanPreviousPage()}
                                       label="Previous"
                                    />
                                    <Button
                                       onClick={() => table.nextPage()}
                                       disabled={!table.getCanNextPage(-1)}
                                       label="Next"
                                    />
                                 </div>
                              </div>
                           ) : null
                     }
                  </>
               )
         }
      </div>
   );
}

export function IndeterminateCheckbox({
   indeterminate,
   className = "",
   ...rest
}) {
   const ref = useRef(null);

   useEffect(() => {
      if (typeof indeterminate === "boolean") {
         ref.current.indeterminate = !rest.checked && indeterminate;
      }
   }, [ref, indeterminate]);

   return <Checkbox ref={ref} className={className} {...rest} />;
}
