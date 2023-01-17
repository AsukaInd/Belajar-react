import { useQuery } from "react-query";
import { getHosts } from "../../api/host/getHosts";

export const GET_HOST_QUERY_KEY = "subscriber-host";

export function useHosts({ page, pageSize } = {}) {
   return useQuery(
      [GET_HOST_QUERY_KEY, page, pageSize],
      () => getHosts({ page, pageSize })
   );
}
