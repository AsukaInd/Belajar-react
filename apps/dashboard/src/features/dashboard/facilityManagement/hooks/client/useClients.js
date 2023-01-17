import { useQuery } from "react-query";
import { getClients } from "../../api/client/getClients";

export const GET_CLIENTS_QUERY_KEY = "subscriber-client";

export function useClients({ key, id, page, perPage } = {}) {
   return useQuery(
      [GET_CLIENTS_QUERY_KEY, id, page, perPage], 
      () => getClients({ id, page, perPage })
   );
}
