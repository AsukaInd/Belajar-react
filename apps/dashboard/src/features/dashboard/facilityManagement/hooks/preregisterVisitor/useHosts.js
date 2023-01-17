import { useQuery } from "react-query";
import { getHosts } from "../../api/preregisterVisitor/getHosts";

export const GET_SUBSCRIBER_HOSTS = "subscriber-preregister-visitor-hosts";

export function useHosts() {
   return useQuery(GET_SUBSCRIBER_HOSTS, getHosts);
}
