import { useQuery } from "react-query";
import { getAssignee } from "../../api/workOrder/getAssignee";

export const GET_WORK_ORDERS_ASSIGNEE = "subscriber-work-orders-assignee";

export function useAssignees({config} = {}) {
   return useQuery(
      [GET_WORK_ORDERS_ASSIGNEE], getAssignee, config
   );
}
