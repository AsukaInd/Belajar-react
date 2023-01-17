import { useQuery } from "react-query";
import { getAllProvince } from "../repositories/province.repositories";

export const GET_ALL_PROVINCE_QUERY_KEY = "subscriber-all-province";

export function useAllProvince() {
   return useQuery([GET_ALL_PROVINCE_QUERY_KEY], getAllProvince);
}
