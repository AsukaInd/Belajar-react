import { useQuery } from "react-query";
import { getSites } from "../../api/site/getSites";

export const GET_SITES_QUERY_KEY = "subscriber-sites";

export function useSites({ id, config, page, perPage, sort_order, sort_by, filter, search } = {}) {
   return useQuery(
      [GET_SITES_QUERY_KEY, id, page, perPage, sort_order, filter, search, sort_by],
      () => getSites({ id, page, perPage, sort_order, filter, search, sort_by }),
      config
   );
}
