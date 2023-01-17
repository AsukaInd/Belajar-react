import {
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getSortedRowModel,
   useReactTable,
} from "@tanstack/react-table";
import { useState, useMemo, useRef, useEffect } from "react";
import { classNames } from "primereact/utils";

export function Table(props) {
   const tableData = useMemo(() => props.data, [props.data]);
   const [sorting, setSorting] = useState([]);
   const tableColumns = useMemo(() => props.columns, [props.columns]);

   const tableWrapperRef = useRef(null)
   const tableRef = useRef(null)

   const pagination = useMemo(
    () => ({
      pageIndex: props.pageIndex,
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
         sorting,
      },
      pageCount: props.pageCount ?? -1,
      manualPagination: true,
      onPaginationChange: props.setPagination,
      onSortingChange: setSorting,
      onRowSelectionChange: props.setRowSelection ?? null,
      getSortedRowModel: getSortedRowModel(),
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
                     <th key={header.id} colSpan={header.colSpan} className="!bg-white-fa">
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
      if(tableWrapperRef.current) {

         function onResize() {
            const tableWrapperSize = tableWrapperRef.current.getBoundingClientRect()
            const tableSize = tableRef.current.getBoundingClientRect()

            if(tableWrapperSize.width > tableSize.width) {
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
                           !isEmpty ? `${props.totalStickyCol ?? 'sticky-col-3'}` : "",
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
                  </>
               )
         }
      </div>
   );
}