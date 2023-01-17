import { useQuery } from "react-query";
import { getClientUsers } from "../../api/user/getClientUsers";

export const GET_CLIENT_USER_QUERY_KEY = "subscriber-client-user";

export function useClientUsers({ clientId, config }) {
   return useQuery(
      [GET_CLIENT_USER_QUERY_KEY, clientId], 
      () => getClientUsers({ clientId }),
      config
   );
}
