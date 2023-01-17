import { useQuery } from "react-query";
import { getWorkOrderAssets } from "../../api/workOrder/getWorkOrderAssets";

export const GET_WORK_ORDER_ASSETS_QUERY_KEY = "subscriber-work-order-assets";

export function useWorkOrderAssets() {
   return useQuery(
      [GET_WORK_ORDER_ASSETS_QUERY_KEY],
      getWorkOrderAssets
   );
}
