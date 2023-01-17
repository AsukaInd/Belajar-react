import { useQuery } from "react-query";
import { getTypes } from "../api/getTypes";

export const GET_TYPES_QUERY_KEY = "officer-types";

export function useTypes(params) {
   return useQuery(
      `${GET_TYPES_QUERY_KEY}-${params.name}-${params.siteId}`,
      () => getTypes(params)
   );
}
