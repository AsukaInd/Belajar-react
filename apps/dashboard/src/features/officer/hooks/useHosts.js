import { useQuery } from "react-query";
import { getHosts } from "../api/getHosts";

export const GET_HOSTS_QUERY_KEY = "officer-hosts";

export function useHosts() {
   return useQuery(GET_HOSTS_QUERY_KEY, getHosts);
}
