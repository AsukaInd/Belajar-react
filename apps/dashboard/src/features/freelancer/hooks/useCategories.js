import { useQuery } from "react-query";
import { getCategory } from "../api/getCategory";

export const GET_CATEGORY_QUERY_KEY = "freelancer-category";

export function useCategories() {
    return useQuery([GET_CATEGORY_QUERY_KEY], getCategory);
}