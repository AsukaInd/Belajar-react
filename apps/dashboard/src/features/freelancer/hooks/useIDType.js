import { useQuery } from "react-query";
import { getIDType } from "../api/getIDType";

export const GET_ID_TYPE_QUERY_KEY = "freelancer-id-type";

export function useIDType() {
    return useQuery([GET_ID_TYPE_QUERY_KEY], getIDType);
}