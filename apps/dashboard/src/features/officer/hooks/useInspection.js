import { useQuery } from "react-query";
import { getInspection } from "../api/getInspection";

export const GET_INSPECTION_QUERY_KEY = "officer-inspection";

export function useInspection() {
   return useQuery(GET_INSPECTION_QUERY_KEY, getInspection);
}
