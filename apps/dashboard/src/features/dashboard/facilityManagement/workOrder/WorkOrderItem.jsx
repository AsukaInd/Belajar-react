import { classNames } from "primereact/utils";
import { IconRepeat } from "~/components/icons/IconRepeat";
import { IconLockSimpleOpen } from "~/components/icons/IconLockSimpleOpen";
import { IconPause } from "~/components/icons/IconPause";
import { IconDoneAll } from "~/components/icons/IconDoneAll";
import { WorkOrderPriority } from "./WorkOrderPriority";
import { sliceText } from "~/utils/sliceText";
import { Menu } from "primereact/menu";
import { useRef } from 'react'
import { useChangeStatus } from '~/features/dashboard/facilityManagement/hooks/workOrder/useChangeStatus'
import { FaChevronDown } from "react-icons/fa";
import { ItemLayout } from "../../../../components/GridViewLayout/ItemLayout";

export function WorkOrderItem({ index, item }) {
   return (
      <ItemLayout
         id={item.id}
         index={index}
      >
         <div className="flex items-center justify-between">
            <h1 className="text-[14px] mb-0 flex-1">
               {sliceText({ text: item.name, limit: 30 })}
            </h1>
            <WorkOrderStatus status={item.status} id={item.id} />
         </div>
         <div className="flex items-center justify-between mt-2 mb-3">
            <span className="text-[12px] text-[#7A7A7A]">
               Requested By{" "}
               <span className="font-semibold">{item.assigned_by?.name}</span>
            </span>
            <WorkOrderAssignedUser users={item.assigned_to} />
         </div>
         <div className="flex items-center justify-between">
            <img
               className="rounded-lg"
               src={item.files[0]}
               width="36"
               height="36"
            />
            <WorkOrderPriority priorityData={item.priority} />
         </div>
      </ItemLayout>
   );
}

function WorkOrderStatus({ status, id }) {
   const menu = useRef(null);

   const changeStatusMutation = useChangeStatus({
      onError(error) {
         toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Unknown error",
            life: 3000,
         });
      }
   })

   const defaultStatus = {
      "in-progress": {
         bg: "bg-[#E8EAF6]",
         color: "text-[#005AA6]",
         icon: <IconRepeat className="text-[#005AA6]" />,
         text: 'In Progress',
      },
      "on-hold": {
         bg: "bg-[#FFF5E9]",
         color: "text-[#F7931D]",
         icon: <IconPause className="text-[#F7931D]" />,
         text: 'On Hold'
      },
      open: {
         bg: "bg-[#F2F2F2]",
         color: "text-[#7A7A7A]",
         icon: <IconLockSimpleOpen className="text-[#7A7A7A]" />,
         text: 'Open'
      },
      done: {
         bg: "bg-[#ECF8EA]",
         color: "text-[#41B92A]",
         icon: <IconDoneAll className="text-[#41B92A]" />,
         text: "Done"
      },
   };

   const items = [
      {
         label: "Open",
         icon: (
            <IconLockSimpleOpen
               className={classNames(
                  "ml-auto flex-order-1",
                  defaultStatus.open.color
               )}
            />
         ),
         command(event) {
            event.originalEvent.stopPropagation()
            changeStatusMutation.mutate({ id, status: 'open' })
         },
      },
      {
         label: "In Progress",
         icon: (
            <IconRepeat
               className={classNames(
                  "ml-auto flex-order-1",
                  defaultStatus['in-progress'].color
               )}
            />
         ),
         command(event) {
            event.originalEvent.stopPropagation()
            changeStatusMutation.mutate({ id, status: 'in-progress' })
         },
      },
      {
         label: "On Hold",
         icon: (
            <IconPause
               className={classNames(
                  "ml-auto flex-order-1",
                  defaultStatus['on-hold'].color
               )}
            />
         ),
         command(event) {
            event.originalEvent.stopPropagation()
            changeStatusMutation.mutate({ id, status: 'on-hold' })
         },
      },
      {
         label: "Done",
         icon: (
            <IconDoneAll
               className={classNames(
                  "ml-auto flex-order-1",
                  defaultStatus.done.color
               )}
            />
         ),
         command(event) {
            event.originalEvent.stopPropagation()
            changeStatusMutation.mutate({ id, status: 'done' })
         },
      },
   ];

   return (
      <>
         <button
            disabled={changeStatusMutation.isLoading}
            className={classNames(
               "flex items-center justify-between gap-3 p-2 rounded-md font-bold",
               "text-[12px] border-0 cursor-pointer ml-4 flex-2",
               defaultStatus[status]?.bg,
               defaultStatus[status]?.color
            )}
            onClick={(event) => {
               // event.stopPropagation()
               // menu.current.toggle(event);
            }}
         >
            {
               changeStatusMutation.isLoading
                  ? <i className="pi pi-spin pi-spinner"></i>
                  : defaultStatus[status]?.icon
            }
            {defaultStatus[status]?.text}
            <FaChevronDown className="ml-2 text-[#7a7a7a]" />
         </button>
         <Menu
            popup
            className="max-w-[135px] mt-2"
            model={items}
            ref={menu}
            id="more-options"
         />
      </>
   );
}

function WorkOrderAssignedUser({ users }) {
   const assignedUser = Array.isArray(users) ? users : users ? [users] : []

   return (
      <div className="flex items-center">
         {assignedUser.length > 0 && assignedUser?.slice(0, 2).map((user) => (
            <img
               key={user?.id}
               className="rounded-full"
               src={user?.image}
               height="18"
               width="18"
            />
         ))}
         {assignedUser?.length > 2 && (
            <span className="ml-2 text-[10.5px] text-[#7A7A7A]">+1</span>
         )}
      </div>
   );
}
