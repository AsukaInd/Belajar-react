import { useQuery } from "react-query";
import { getVisitorIn } from "../api/getVisitorIn";

export const GET_VISITORS_IN_QUERY_KEY = "officer-visitor-in";

export function useVisitors(params) {
   return useQuery(GET_VISITORS_IN_QUERY_KEY, () => getVisitorIn(params));
}
