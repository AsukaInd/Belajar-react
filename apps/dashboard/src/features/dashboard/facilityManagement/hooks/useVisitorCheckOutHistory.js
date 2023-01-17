import { useQuery } from "react-query";
import { getVisitorCheckOutHistory } from "../api/getVisitorCheckOutHistory";

export const GET_VISITOR_CHECKOUT_HISTORY_QUERY_KEY = "subscriber-visitor-checkout-history";

export function useVisitorCheckOutHistory({ page, pageSize }) {
   return useQuery(
      [GET_VISITOR_CHECKOUT_HISTORY_QUERY_KEY, page, pageSize],
      () => getVisitorCheckOutHistory({ page, pageSize }),
   );
}
