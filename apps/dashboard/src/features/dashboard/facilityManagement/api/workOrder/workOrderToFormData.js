import { formatDueDate } from '~/utils/formatDate'

export function workOrderToFormData(data) {
   const formData = new FormData()

   Object.entries(data).forEach(([key, value]) => {
      if (key === "files") {
         value.forEach((file, index) => {
            if (file instanceof File) {
               formData.append(`files[${index}]`, file);
            }
         })
      } else if (key === 'due_date' || key === 'start_date') {
         formData.append(key, formatDueDate(value))
      } else {
         formData.append(key, value);
      }
   })

   return formData
}