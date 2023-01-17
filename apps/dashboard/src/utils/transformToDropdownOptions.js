export function transformToDropdownOptions(
   data,
   keys = { label: "name", value: "id" }
) {
   if (!data) return []
   if (!Array.isArray(data) && data.length === 0) return [];
   if (!Array.isArray(keys) && keys.length === 0) return [];

   return data.map((item) => {

      if (typeof keys === 'function') {
         return keys(item)
      } else {
         return {
            label: item[keys.label],
            value: item[keys.value],
         };
      }
   });
}
