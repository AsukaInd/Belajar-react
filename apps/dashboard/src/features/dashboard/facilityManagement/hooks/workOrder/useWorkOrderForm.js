import { useMutation, useQueryClient } from "react-query";
import { addWorkOrder } from "../../api/workOrder/addWorkOrder";
import { editWorkOrder } from "../../api/workOrder/editWorkOrder";
import { GET_WORK_ORDERS_QUERY_KEY } from "./useWorkOrders";

export function useWorkOrderForm({ config, handleSuccess, isEdit }) {
   const queryClient = useQueryClient();

   function onSuccess(data) {
      queryClient.invalidateQueries([GET_WORK_ORDERS_QUERY_KEY]);
      handleSuccess(data);
   }

   if (isEdit) {
      return useMutation(editWorkOrder, {
         onSuccess,
         ...config,
      });
   }

   return useMutation(addWorkOrder, {
      onSuccess,
      ...config,
   });
}
