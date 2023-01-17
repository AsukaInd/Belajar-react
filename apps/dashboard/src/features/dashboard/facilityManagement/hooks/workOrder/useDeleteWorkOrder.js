import { useMutation, useQueryClient } from "react-query";
import { deleteWorkOrder } from "../../api/workOrder/deleteWorkOrder";
import { GET_WORK_ORDERS_QUERY_KEY } from "./useWorkOrders";

export function useDeleteWorkOrder({ onSuccess, id, ...config }) {
   const queryClient = useQueryClient();

   function handleSuccess(data) {
      queryClient.invalidateQueries([GET_WORK_ORDERS_QUERY_KEY]);

      if(onSuccess) {
         onSuccess(data)
      }   
   }

   return useMutation(() => deleteWorkOrder({ id }), {
      onSuccess: handleSuccess,
      ...config,
   });
}
