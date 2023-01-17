import { ItemLayout } from "../../../../../../components/GridViewLayout/ItemLayout";

export function VisitorCheckOutItem({ index, item }) {
   return (
      <ItemLayout
         id={item.id}
         index={index}
         routerState={item}
         customLink={`out/${item.id}`}
      >
         <div className="flex items-center justify-between">
            <h1 className="text-[14px] mb-0 flex-1">
               {item.first_name} {item.last_name}
            </h1>
         </div>
         <div className="flex items-center justify-between mt-2 mb-3">
            <span className="text-[12px] text-[#7A7A7A]">
               <span className="font-semibold">{item.officer?.first_name} {item.officer?.last_name}</span>
            </span>
         </div>
         <div className="flex items-center justify-between">
            <img
               className="rounded-lg"
               src={item.files[0]}
               width="36"
               height="36"
            />
         </div>
      </ItemLayout>
   );
}
