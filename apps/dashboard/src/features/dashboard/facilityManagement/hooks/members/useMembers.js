import { useQuery } from "react-query";
import { getMembers } from "../../api/members/getMembers";

export const GET_MEMBERS_QUERY_KEY = "subscriber-members";

export function useMembers() {
   return useQuery(GET_MEMBERS_QUERY_KEY, getMembers);
}
