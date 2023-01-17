import { Button } from "primereact/button";
import { ListLayout } from "../../../../../../components/GridViewLayout/ListLayout";
import { VisitorLogItem } from "./VisitorLogItem";

export function VisitorLogList({ list, selected, setSelected }) {
   return (
      <ListLayout
         isNoData={list.length === 0}
         noDataMessage="No visitor log found"
         title="Visitor Log"
      >
         {
            list.map((item, index) => (
               <VisitorLogItem
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
