import { useQuery } from "react-query";
import { getPermission } from "../api/getPermission";

export const GET_PERMISSION_QUERY_KEY = "subscriber-permission";

export function usePermissions() {
   return useQuery(
      [GET_PERMISSION_QUERY_KEY],
      getPermission,
   );
}
