export function toFormData(data) {
   const formData = new FormData();

   buildFormData(formData, data);

   return formData;
}

function buildFormData(formData, data, parentKey) {
   if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
      Object.keys(data).forEach(key => {
         buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
   } else {
      const value = data == null ? '' : data;

      if (parentKey === "photo" || parentKey === "profile_image" || parentKey === "image") {
         if (value instanceof File) {
            formData.append(parentKey, value)
         }
      } else {
         formData.append(parentKey, value);
      }

   }
}