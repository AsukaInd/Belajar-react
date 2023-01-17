import { ListLayout } from "../../../../../components/GridViewLayout/ListLayout";
import { PreregisterVisitorItem } from "./PreregisterVisitorItem";

export function PreregisterVisitorList({ list, selected, setSelected }) {
   return (
      <ListLayout
         isNoData={list.length === 0}
         noDataMessage="No pre register visitor found"
         title="pre register visitor"
      >
         {
            list.map((item, index) => (
               <PreregisterVisitorItem
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
