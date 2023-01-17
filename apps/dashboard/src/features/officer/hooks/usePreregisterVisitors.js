import { useQuery } from "react-query";
import { getPreregisterVisitor } from "../api/getPreregisterVisitor";

export const GET_PREREGISTER_VISITORS_QUERY_KEY = "officer-preregister-visitor";

export function usePreregisterVisitors() {
   return useQuery(GET_PREREGISTER_VISITORS_QUERY_KEY, getPreregisterVisitor);
}
