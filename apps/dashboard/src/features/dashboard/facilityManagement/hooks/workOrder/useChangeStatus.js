import { useMutation, useQueryClient } from "react-query";
import { changeStatus } from "../../api/workOrder/changeStatus";
import { GET_WORK_ORDERS_QUERY_KEY } from "./useWorkOrders";

export function useChangeStatus(config) {
   const queryClient = useQueryClient();

   return useMutation(changeStatus, {
      onSuccess(data) {
         queryClient.invalidateQueries([GET_WORK_ORDERS_QUERY_KEY]);
      },
      config
   });
}
