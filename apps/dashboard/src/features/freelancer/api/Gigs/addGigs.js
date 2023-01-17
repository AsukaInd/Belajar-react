import { axiosInstance, createHeaders } from "~/lib/axios";
import { tokenStorage, FREELANCER_KEY, ADMIN_KEY } from "~/utils/tokenStorage";

export async function addGigs(dataGigs) {
   const token = tokenStorage.getTokens();

   try {
      const { data } = await axiosInstance.post(
         "/freelancer/freelancers/dashboard/services",
         toFormData(dataGigs),
         {
            headers: createHeaders(
               token[FREELANCER_KEY] ? token[FREELANCER_KEY] : token[ADMIN_KEY]
            )
         }
      );

      return data;
   } catch (error) {
      return Promise.reject({ ...error.response, ...error });
   }
}

function toFormData(data) {
   const formData = new FormData();

   Object.entries(data).forEach(([key, value]) => {
      if (key === 'faqs_gigs') {
         convertFaqGigs(key, value)
      } else if (key === 'package_gigs') {
         convertPackageGigs(key, value)
      } else if (key === 'gig_photos') {
         convertGigPhotos(key, value)
      } else if (isEmpty(key)) {
         formData.append(key, value);
      }
   });

   function convertFaqGigs(key, value) {
      value.forEach((faqs, faqGigsIndex) => {
         Object.entries(faqs).forEach(([faqKey, faqValue]) => {
            if (isEmpty(faqValue)) {
               formData.append(`${key}[${faqGigsIndex}][${faqKey}]`, faqValue);
            }
         })
      });
   }

   function convertPackageGigs(key, value) {
      value.forEach((packages, packageIndex) => {
         Object.entries(packages).forEach(([packageKey, packageValue]) => {
            if (packageKey === 'scope_package_gigs') {
               packageValue.forEach((scopePackage, scopeIndex) => {
                  Object.entries(scopePackage).forEach(([scopeKey, scopeValue]) => {
                     if (isEmpty(scopeValue)) {
                        formData.append(`${key}[${packageIndex}][${packageKey}][${scopeIndex}][${scopeKey}]`, scopeValue);
                     }
                  })
               })
            } else if (isEmpty(packageValue)) {
               formData.append(`${key}[${packageIndex}][${packageKey}]`, packageValue);
            }
         })
      });
   }

   function convertGigPhotos(key, value) {
      value.forEach((gigPhotos, gigPhotosIndex) => {
         Object.entries(gigPhotos).forEach(([gigPhotosKey, gigPhotosValue]) => {
            if (isEmpty(gigPhotosValue)) {
               formData.append(`${key}[${gigPhotosIndex}][${gigPhotosKey}]`, gigPhotosValue);
            }
         })
      })
   }

   function isEmpty(value) {
      return value !== null || value === ""
   }

   return formData;
}
