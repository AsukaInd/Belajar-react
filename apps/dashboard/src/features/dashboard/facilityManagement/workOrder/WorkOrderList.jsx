import { ListLayout } from "../../../../components/GridViewLayout/ListLayout";
import { WorkOrderItem } from "./WorkOrderItem";

export function WorkOrderList({ list, selected, setSelected }) {
   return (
      <ListLayout
         isNoData={list.length === 0}
         noDataMessage="No work orders found"
         title="Work Order"
      >
         {
            list.map((item, index) => (
               <WorkOrderItem
                  key={item.id}
                  index={index}
                  item={item}
                  selected={selected}
                  setSelected={setSelected}
               />
            ))
         }
      </ListLayout>
   )
}
