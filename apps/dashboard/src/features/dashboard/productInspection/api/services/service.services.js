import { useQuery } from "react-query";
import { getService } from "../repositories/service.repositories";

export const GET_CLIENTS_QUERY_KEY = "subscriber-service";

export function useService({ key, id, page, perPage } = {}) {
   return useQuery(
      [GET_CLIENTS_QUERY_KEY, id, page, perPage], 
      () => getService({ id, page, perPage })
   );
}
