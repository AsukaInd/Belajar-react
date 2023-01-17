import { useQuery } from "react-query";
import { getCompanyType } from "../repositories/company-type.repositories";

export const GET_COMPANY_TYPE_QUERY_KEY = "subscriber-company-type";

export function useCompanyType() {
   return useQuery([GET_COMPANY_TYPE_QUERY_KEY], getCompanyType);
}
