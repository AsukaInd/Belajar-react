import { Button } from "primereact/button";
import { ListLayout } from "../../../../../components/GridViewLayout/ListLayout";
import { SiteItem } from "./SiteItem";

export function SiteList({ list, selected, setSelected, hasNextPage, setPagination, pageIndex }) {
   return (
      <ListLayout
         isNoData={list.length === 0}
         noDataMessage="No site found"
         title="Site"
      >
         <div className="flex flex-col justify-between h-[calc(100%-41px)]">
            <div>
               {
                  list.map((item, index) => (
                     <SiteItem
                        key={item.id}
                        index={index}
                        item={item}
                        selected={selected}
                        setSelected={setSelected}
                     />
                  ))
               }
            </div>
            <div className="flex justify-between items-center px-2 pb-3">
               <Button
                  disabled={pageIndex === 0}
                  className="p-button-text"
                  label="Previous"
                  onClick={() => {
                     setPagination(prev => ({ ...prev, pageIndex: prev.pageIndex - 1 }))
                  }}
               />
               <Button
                  disabled={!hasNextPage}
                  className="p-button-text"
                  label="Next"
                  onClick={() => {
                     setPagination(prev => ({ ...prev, pageIndex: prev.pageIndex + 1 }))
                  }}
               />
            </div>
         </div>
      </ListLayout>
   )
}
