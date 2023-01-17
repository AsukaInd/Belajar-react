import { useQuery } from "react-query";
import { getWorkOrder } from "../../api/workOrder/getWorkOrder";

export const GET_WORK_ORDERS_QUERY_KEY = "subscriber-work-orders";

export function useWorkOrders({ id, page, perPage, config, dueDateFilter, statusFilter }) {
   return useQuery(
      [GET_WORK_ORDERS_QUERY_KEY, id, page, perPage, dueDateFilter, statusFilter], 
      () => getWorkOrder({ id, page, perPage, dueDateFilter, statusFilter }),
      config
   );
}
