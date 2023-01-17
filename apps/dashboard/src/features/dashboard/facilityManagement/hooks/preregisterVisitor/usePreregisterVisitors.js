import { useQuery } from "react-query";
import { getPreregisterVisitor } from "../../api/preregisterVisitor/getPreregisterVisitor";

export const GET_PREREGISTER_VISITOR_QUERY_KEY =
   "subscriber-preregister-visitor";

export function usePreregisterVisitors({ id, page, perPage, sort_order, sort_by, filter, filter_by, search, config } = {}) {
   return useQuery(
      [GET_PREREGISTER_VISITOR_QUERY_KEY, id, page, perPage, sort_order, sort_by, filter, filter_by, search],
      () => getPreregisterVisitor({ id, page, perPage, sort_order, sort_by, filter, filter_by, search }),
      config
   );
}
