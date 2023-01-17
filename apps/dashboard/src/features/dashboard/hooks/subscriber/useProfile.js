import { useQuery } from "react-query";
import { getProfile } from "../../api/getProfile";

export const GET_PROFILE_QUERY_KEY = "subscriber-profile";

export function useProfile() {
   return useQuery(GET_PROFILE_QUERY_KEY, getProfile);
}
