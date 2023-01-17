import { formatAPIDate } from "~/utils/formatDate";

export function objectToFormData(dataReport) {
   const formData = new FormData();

   Object.entries(dataReport).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
         value.forEach((item, index) => {
            if (item instanceof File) {
               formData.append(`${key}[${index}]`, item);
            } else {
               Object.entries(item).forEach(([objKey, objValue]) => {
                  formData.append(
                     `${key}[${index}][${objKey}]`,
                     objValue instanceof Date
                        ? formatAPIDate(objValue)
                        : objValue
                  );
               });
            }
         });
      } else if (value !== null) {
         formData.append(key, value);
      }
   });

   return formData;
}
