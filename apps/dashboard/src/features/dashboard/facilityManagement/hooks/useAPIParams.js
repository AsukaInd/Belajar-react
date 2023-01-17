import { useState, useRef } from "react";

export function useAPIParams() {
   const searchRef = useRef()

   const [params, setParams] = useState({
      pageIndex: 0,
      pageSize: 10,
      search: null,
      filter: null,
      filter_by: null,
   });

   function updateSearch(searchValue) {
      setParams(prev => ({
         ...prev,
         pageIndex: 0,
         search: searchValue
      }));
   }

   function setSearch(event) {
      const value = searchRef.current?.value
      if (event.key === 'Enter' && value) {
         updateSearch(value)
      }
   }

   function resetSearch(event) {
      if (event.target.value === '') {
         updateSearch("")
      }
   }

   return { params, setParams, setSearch, resetSearch, searchRef };
}
