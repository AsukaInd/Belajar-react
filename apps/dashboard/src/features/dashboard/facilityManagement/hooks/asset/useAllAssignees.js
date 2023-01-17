import { useQuery } from "react-query";
import { getAllAssignees } from "~/features/dashboard/facilityManagement/api/asset/getAllAssignees";

export const GET_ALL_ASSIGNEES_QUERY_KEY = "subscriber-all-assignees";

export function useAllAssignees() {
   return useQuery([GET_ALL_ASSIGNEES_QUERY_KEY], getAllAssignees);
}
