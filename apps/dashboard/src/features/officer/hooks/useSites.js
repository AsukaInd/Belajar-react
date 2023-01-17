import { useQuery } from "react-query";
import { getSites } from "../api/getSites";

export const GET_SITES_QUERY_KEY = "officer-sites";

export function useSites() {
   return useQuery(GET_SITES_QUERY_KEY, getSites);
}
