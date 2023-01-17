import { useQuery } from "react-query";
import { getCompanySize } from "../api/getCompanySize";

export const GET_COMPANY_SIZE_QUERY_KEY = "freelancer-company-size";

export function useCompanySize() {
    return useQuery([GET_COMPANY_SIZE_QUERY_KEY], getCompanySize);
}