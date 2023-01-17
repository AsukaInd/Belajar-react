import { useQuery } from "react-query";
import { getSubCategory } from "../api/getSubCategory";

export const GET_SUB_CATEGORY_QUERY_KEY = "freelancer-sub-category";

export function useSubCategories() {
    return useQuery([GET_SUB_CATEGORY_QUERY_KEY], getSubCategory);
}