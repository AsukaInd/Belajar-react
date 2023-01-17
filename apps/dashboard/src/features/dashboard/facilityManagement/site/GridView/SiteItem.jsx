import { ItemLayout } from "../../../../../components/GridViewLayout/ItemLayout";

export function SiteItem({ index, item }) {
   return (
      <ItemLayout
         id={item.id}
         index={index}
         routerState={item}
      >
         <div className="flex items-center justify-between">
            <h1 className="text-[14px] mb-0 flex-1">
               {item.site_name}
            </h1>
         </div>
         <div className="flex items-center justify-between mt-2 mb-3">
            <span className="text-[12px] text-[#7A7A7A]">
               <span className="font-semibold">{item.country}</span>
            </span>
         </div>
         <div className="flex items-center justify-between">
            <img
               className="rounded-lg"
               src={item?.photo}
               width="36"
               height="36"
            />
         </div>
      </ItemLayout>
   );
}
