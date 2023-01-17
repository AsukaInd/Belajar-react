import { ServiceItem } from "../service/ServiceItem";
import { freelancerServiceData } from "../service/freelancerServiceData";

export function AlsoViewed() {
   return (
      <div>
         <h1 className="text-[30px] font-bold mb-[34px]">People Who Viewed This Service Also Viewed</h1>
         <div className="flex gap-[40px] overflow-x-auto py-[12px]" >
            {freelancerServiceData.slice(0, 4).map((item) => (
               <ServiceItem
                  className="drop-shadow-none min-w-[230px]"
                  bannerClassName="h-[150px]"
                  key={item.id}
                  item={item}
               />
            ))}
         </div>
      </div>
   )
}