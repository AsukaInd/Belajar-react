import { WorkOrderPriority } from "./WorkOrderPriority";
import { Button } from "primereact/button";
import { IconRepeat } from "~/components/icons/IconRepeat";
import { IconLockSimpleOpen } from "~/components/icons/IconLockSimpleOpen";
import { IconPause } from "~/components/icons/IconPause";
import { IconDoneAll } from "~/components/icons/IconDoneAll";
import { IconLocation } from "~/components/icons/IconLocation";
import { IconTimer } from "~/components/icons/IconTimer";
import { IconTime } from "~/components/icons/IconTime";
import { formatDate } from "~/utils/formatDate";
import { classNames } from "primereact/utils";
import { DeleteWorkOrder } from "./DeleteWorkOrder";
import { useRef, useState } from "react";
import { IconDelete } from "~/components/icons/IconDelete";
import { IconEdit } from "~/components/icons/IconEdit";
import { Menu } from "primereact/menu";
import { EditWorkOrderDialog } from "./EditWorkOrderDialog";
import { useChangeStatus } from '~/features/dashboard/facilityManagement/hooks/workOrder/useChangeStatus'
import { useWorkOrders } from '~/features/dashboard/facilityManagement/hooks/workOrder/useWorkOrders'
import { useParams } from 'react-router-dom'
import { ProgressSpinner } from "primereact/progressspinner";
import { ErrorMessage } from "~/components/ErrorMessage";
import { Toast } from "primereact/toast";
import { FaEllipsisH } from "react-icons/fa";

export default function WorkOrderDetail() {
   const toast = useRef(null);
   const [deleteDialog, setDeleteDialog] = useState(false);
   const [editDialog, setEditDialog] = useState(false);
   const menu = useRef(null);
   const changeStatusMutation = useChangeStatus({
      onError() {
         toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Unknown error",
            life: 3000,
         });
      }
   })
   const { id } = useParams()
   const { status, data, error } = useWorkOrders({ id })

   const items = [
      {
         label: "Edit",
         icon: <IconEdit className="ml-auto flex-order-1" />,
         command() {
            openEditDialog();
         },
      },
      {
         label: "Delete",
         icon: <IconDelete className="ml-auto flex-order-1" />,
         command() {
            openDeleteWorkOrder();
         },
      },
   ];

   const assignedTo = Array.isArray(data?.data?.assigned_to)
      ? data?.data?.assigned_to
      : [data?.data?.assigned_to]

   function openDeleteWorkOrder() {
      setDeleteDialog(true);
   }

   function closeDeleteWorkOrder() {
      setDeleteDialog(false);
   }

   function openEditDialog() {
      setEditDialog(true);
   }

   function closeEditDialog() {
      setEditDialog(false);
   }

   function changeStatus(status) {
      changeStatusMutation.mutate({ id: data?.data?.id, status })
   }

   const selectedWorkOrder = data?.data && (
      <div>
         <div className="px-[24px] py-[16px] sticky top-0 bg-[#f4f4f4] z-1">
            <div className="flex items-center justify-between mb-[20px]">
               <WorkOrderPriority
                  priorityData={data?.data?.priority}
                  limit={data?.data?.priority.length}
               />
               <span className="font-[700] text-[#a7a7a7]">
                  Work ID #{data?.data?.id}
               </span>
            </div>
            <div className="flex items-center justify-between">
               <h1 className="mb-0 text-[21px] font-[500] mr-4">
                  {data?.data?.name}
               </h1>
               <Button
                  className="p-button-text p-button-rounded"
                  icon={<FaEllipsisH style={{ height: '30px', width: '30px' }} />}
                  onClick={(event) => {
                     menu.current.toggle(event);
                  }}
               />
            </div>
         </div>
         <div className="px-[24px] pb-4">
            <div className="py-4 border-solid border-x-0  border-t-0 border-b border-[#e9e9e9]">
               <h1 className="text-[16px] mb-[16px]">
                  Work Status{" "}
                  <span className="text-[14px] text-[#a7a7a7]">
                     (click to change)
                  </span>
               </h1>
               <div className="flex gap-3">
                  <WorkOrderStatusBtn
                     icon={<IconLockSimpleOpen height="16" width="16" />}
                     label="Open"
                     isActive={data?.data?.status === 'open'}
                     status={data?.data?.status}
                     onClick={() => changeStatus('open')}
                     loading={
                        changeStatusMutation.isLoading &&
                        changeStatusMutation.variables?.status === 'open'
                     }
                     disabled={changeStatusMutation.isLoading}
                  />
                  <WorkOrderStatusBtn
                     icon={<IconRepeat height="16" width="16" />}
                     label="In Progress"
                     isActive={data?.data?.status === 'in-progress'}
                     status={data?.data?.status}
                     onClick={() => changeStatus('in-progress')}
                     loading={
                        changeStatusMutation.isLoading &&
                        changeStatusMutation.variables?.status === 'in-progress'
                     }
                     disabled={changeStatusMutation.isLoading}
                  />
                  <WorkOrderStatusBtn
                     icon={<IconPause height="16" width="16" />}
                     label="On Hold"
                     isActive={data?.data?.status === 'on-hold'}
                     status={data?.data?.status}
                     onClick={() => changeStatus('on-hold')}
                     loading={
                        changeStatusMutation.isLoading &&
                        changeStatusMutation.variables?.status === 'on-hold'
                     }
                     disabled={changeStatusMutation.isLoading}
                  />
                  <WorkOrderStatusBtn
                     icon={<IconDoneAll height="16" width="16" />}
                     label="Done"
                     isActive={data?.data?.status === 'done'}
                     status={data?.data?.status}
                     onClick={() => changeStatus('done')}
                     loading={
                        changeStatusMutation.isLoading &&
                        changeStatusMutation.variables?.status === 'done'
                     }
                     disabled={changeStatusMutation.isLoading}
                  />
               </div>
            </div>
            <div className="py-4 border-solid border-x-0 border-t-0 border-b border-[#e9e9e9]">
               <h1 className="mb-[12px] text-[16px]">Work Description</h1>
               <p className="text-[#7a7a7a]">{data?.data?.description}</p>
            </div>
            <div className="py-4 border-solid border-x-0 border-t-0 border-b border-[#e9e9e9]">
               <h1 className="mb-[12px] text-[16px]">Uploaded Image</h1>
               <div className="flex gap-[24px]">
                  {data?.data?.files?.map((image, index) => (
                     <img
                        key={index}
                        src={image}
                        className="rounded-lg"
                        height="168"
                        width="168"
                     />
                  ))}
               </div>
            </div>
            <div className="py-4 flex gap-12  border-solid border-x-0 border-t-0 border-b border-[#e9e9e9]">
               <div>
                  <h1 className="text-[16px] mb-[12px]">Start Date</h1>
                  <span className="flex items-center gap-2">
                     <IconTime />
                     {formatDate(data?.data?.start_date)}
                  </span>
               </div>
               <div>
                  <h1 className="text-[16px] mb-[12px]">Due Date</h1>
                  <span className="text-[#EB4646] flex items-center gap-2">
                     <IconTimer />
                     {formatDate(data?.data?.due_date)}
                  </span>
               </div>
               <div>
                  <h1 className="text-[16px] mb-[12px]">Location</h1>
                  <span className="flex items-center gap-2 text-[#005AA6]">
                     <IconLocation />
                     {data?.data?.site?.site_name}
                  </span>
               </div>
            </div>
            <div className="py-4 flex flex-column  border-solid border-x-0 border-t-0 border-b border-[#e9e9e9]">
               <h1 className="text-[16px] mb-[12px]">Assign To</h1>
               <div className="flex items-center gap-6">
                  {assignedTo.map((user) => (
                     <div key={user?.id} className="flex items-center gap-3">
                        <img
                           src={user?.image}
                           width="32"
                           height="32"
                           className="rounded-full"
                        />
                        <span>{user?.first_name} {user?.last_name}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );

   return (
      <>
         {
            status === 'loading'
               ? (
                  <div className="h-full w-full grid items-center">
                     <ProgressSpinner strokeWidth={3} />
                  </div>
               )
               : status === 'success'
                  ? selectedWorkOrder
                  : (
                     <div className="h-full flex justify-center items-center">
                        <ErrorMessage error={error} />
                     </div>
                  )
         }
         <DeleteWorkOrder
            isOpen={deleteDialog}
            onClose={closeDeleteWorkOrder}
            id={data?.data?.id}
         />
         <EditWorkOrderDialog
            isOpen={editDialog}
            onClose={closeEditDialog}
            editData={data?.data}
         />
         <Menu
            popup
            style={{ maxWidth: "125px" }}
            model={items}
            ref={menu}
            id="more-options"
         />
         <Toast ref={toast} position="top-right" />
      </>
   );
}

export function WorkOrderStatusBtn({ icon, isActive, label, status, loading, ...props }) {

   const defaultStatusColor = {
      open: {
         bg: "bg-[#7A7A7A]",
      },
      "in-progress": {
         bg: "bg-[#005AA6]",
      },
      "on-hold": {
         bg: "bg-[#F7931D]",
      },
      done: {
         bg: "bg-[#41B92A]",
      },
   };

   return (
      <button
         className={classNames(
            "flex items-center justify-between px-3 py-[.6rem]",
            "rounded-lg cursor-pointer border-solid border font-bold hover:brightness-[95%]",
            "disabled:bg-opacity-50 disabled:border-opacity-50 disabled:hover:brightness-100",
            [
               isActive
                  ? `${defaultStatusColor[status]?.bg} text-white border-transparent`
                  : "border-[#7A7A7A] text-[#7A7A7A] bg-white",
            ]
         )}
         disabled={loading || props.disabled}
         {...props}
      >
         {
            loading
               ? <i className="pi pi-spin pi-spinner mr-2 mx-[7px] my-[4px]"></i>
               : <div className="mr-[12px] pt-1">{icon}</div>
         }
         {label}
      </button>
   );
}
