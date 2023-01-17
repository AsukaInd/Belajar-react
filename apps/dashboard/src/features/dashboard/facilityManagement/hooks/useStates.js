import { useQuery } from "react-query";
import { getStates } from "../api/getStates";

export const GET_GT_STATES_QUERY_KEY = "subscriber-gt-states";

export function useStates({ country, config }) {
    return useQuery([GET_GT_STATES_QUERY_KEY, country], () => getStates({ country }), config);
}
