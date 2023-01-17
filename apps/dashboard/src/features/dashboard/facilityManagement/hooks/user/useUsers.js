import { useQuery } from "react-query";
import { getUsers } from "../../api/user/getUsers";

export const GET_USER_QUERY_KEY = "subscriber-user";

export function useUsers({ type, page, perPage, config } = {}) {
   return useQuery(
      [GET_USER_QUERY_KEY], 
      () => getUsers({ type, page, perPage }),
      config
   );
}
