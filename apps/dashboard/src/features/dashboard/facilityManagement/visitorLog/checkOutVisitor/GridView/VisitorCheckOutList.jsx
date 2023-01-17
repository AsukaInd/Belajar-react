import { Button } from "primereact/button";
import { ListLayout } from "../../../../../../components/GridViewLayout/ListLayout";
import { VisitorCheckOutItem } from "./VisitorCheckOutItem";

export function VisitorLogList({ list, selected, setSelected }) {
   return (
      <ListLayout
         isNoData={list.length === 0}
         noDataMessage="No visitor check out found"
         title="Visitor Check Out"
      >
         {
            list.map((item, index) => (
               <VisitorCheckOutItem
                  key={item.id}
                  index={index}
                  item={item}
                  selected={selected}
                  setSelected={setSelected}
               />
            ))
         }
         {/* <div className="flex justify-between items-center px-2 pb-3">
            <Button className="p-button-text" label="Previous" />
            <Button className="p-button-text" label="Next" />
         </div> */}
      </ListLayout>
   )
}
