import { useRef } from "react";

export function useSearchFilter() {
    const filterSearchRef = useRef(null);

    function filterSearch(event, refetchFn) {
        if (event.key === 'Enter' && event.target.value) {
            refetchFn();
        }
    }

    function resetFilterSearch(event, refetchFn) {
        if (event.target.value === '') {
            refetchFn();
        }
    }

    return { filterSearch, resetFilterSearch, filterSearchRef };
}
