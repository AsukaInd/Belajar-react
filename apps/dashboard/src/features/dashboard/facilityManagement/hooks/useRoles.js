import { useQuery } from "react-query";
import { getRoles } from "../api/getRoles";

export const GET_ROLES_QUERY_KEY = "subscriber-roles";

export function useRoles() {
   return useQuery(GET_ROLES_QUERY_KEY, getRoles);
}
