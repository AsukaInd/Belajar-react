import { formatAPIDate } from "~/utils/formatDate";

export function preregisterToFormData(visitorData, { isUpdate }) {
   if (!visitorData) return null;

   const visitorFormData = new FormData();

   Object.entries(visitorData).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
         value.forEach((item, index) => {
            if (item instanceof File) {
               visitorFormData.append(`${key}[${index}]`, item);
            }

            if (key === "visitor_group" && value.length > 0) {
               visitorFormData.append(`${key}[${index}]`, item.name);
            }
         });
      } else if (key === "start_date" || key === "end_date") {
         visitorFormData.append(key, formatAPIDate(new Date(value)));
      } else if (value != null) {
         visitorFormData.append(key, value);
      }
   });

   if (isUpdate) {
      visitorFormData.delete('files')
   }

   return visitorFormData;
}
