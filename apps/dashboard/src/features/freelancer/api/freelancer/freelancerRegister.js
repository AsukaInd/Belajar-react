import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, FREELANCER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";
import { formatDueDate } from "../../../../utils/formatDate";

export async function freelancerRegister(dataRegister) {
   const token = tokenStorage.getTokens();

   try {
      const { data } = await axiosInstance.post(
         "freelancer/freelancers/register",
         toFormData(dataRegister),
         {
            headers: createHeaders(
               token[FREELANCER_KEY] ? token[FREELANCER_KEY] : token[ADMIN_KEY]
            )
         }
      );

      return data;
   } catch (error) {
      // return Promise.reject({ ...error.response, ...error });
      throw new Error(error)
   }
}

function toFormData(data) {
   const formData = new FormData()

   function getValue(value) {
      return value instanceof Date ? formatDueDate(value) : value
   }

   function convertObject(key, value) {
      if (!value) return

      Object.entries(value).forEach(([objKey, objValue]) => {
         if (objValue) {
            formData.append(`${key}[${objKey}]`, getValue(objValue))
         }
      })
   }

   function convertArrayOfObject(key, value) {
      if (!value) return

      value.forEach((obj, arrayIndex) => {
         Object.entries(obj).forEach(([objKey, objValue]) => {
            if (objValue) {
               formData.append(`${key}[${arrayIndex}][${objKey}]`, getValue(objValue))
            }
         })
      })
   }

   Object.entries(data).forEach(([key, value]) => {
      switch (key) {
         case 'residence_birth':
            convertObject(key, value)
            break;
         case 'work_experience':
            convertArrayOfObject(key, value)
            break;
         case 'educations':
            convertArrayOfObject(key, value)
            break;
         case 'languages':
            convertArrayOfObject(key, value)
            break;
         case 'services':
            convertArrayOfObject(key, value)
            break;
         case 'product_inspection':
            convertObject(key, value)
            break;
         case 'certifications':
            convertArrayOfObject(key, value)
            break;
         default:
            if (value) {
               formData.append(key, value)
            }
      }
   })

   // ????
   formData.append('certifications[0][certification_image]', data.photo ? data.photo : data.id_confirmation_photo)

   return formData
}