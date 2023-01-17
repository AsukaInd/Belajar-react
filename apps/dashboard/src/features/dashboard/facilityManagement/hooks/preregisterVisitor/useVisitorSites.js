import { useQuery } from "react-query";
import { getVisitorSites } from "../../api/preregisterVisitor/getVisitorSites";

export const GET_SUBSCRIBER_VISITOR_SITES = "subscriber-preregister-visitor-sites";

export function useVisitorSites() {
   return useQuery(GET_SUBSCRIBER_VISITOR_SITES, getVisitorSites);
}
