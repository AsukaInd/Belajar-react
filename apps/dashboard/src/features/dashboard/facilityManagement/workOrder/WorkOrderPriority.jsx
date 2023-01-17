import { classNames } from "primereact/utils";

export function WorkOrderPriority({ priorityData, limit = 3 }) {
   return Array.isArray(priorityData) ? (
      <div className="flex items-center gap-3">
         {priorityData?.slice(0, limit).map((priority, index) => (
            <PriorityItem key={index} priority={priority} />
         ))}
      </div>
   ) : <PriorityItem priority={priorityData} />;
}

function PriorityItem({priority}) {
   const defaultPriority = {
      none: {
         bg: "bg-[#DFE8F0]",
         color: "text-[#005AA6]",
      },
      low: {
         bg: "bg-[#E5F1E3]",
         color: "text-[#41B92A]",
      },
      medium: {
         bg: "bg-[#FFF5E9]",
         color: "text-[#F7931D]",
      },
      high: {
         bg: "bg-[#F6E6E6]",
         color: "text-[#EB4646]",
      },
   };

   return (
      <span
         className={classNames(
            "px-[6px] py-[4px] rounded-[4px] text-[10.5px] capitalize",
            defaultPriority[priority]?.bg,
            defaultPriority[priority]?.color
         )}
      >
         {priority}
      </span>
   )
}
