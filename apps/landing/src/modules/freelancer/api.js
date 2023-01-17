import { axiosInstance } from "@/lib/axios";
import { formatDate } from "@/lib/dayjs";

export async function getServices({ page, budget, delivery_time } = { page: 1 }) {
   try {
      const { data } = await axiosInstance.get('/freelancer/services', {
         params: {
            budget: budget || undefined,
            delivery_time: delivery_time || undefined,
            page
         }
      })

      return {
         ...data,
         data: {
            ...data.data,
            data: transformServicesData(data.data)
         },
      }
   } catch (error) {
      throw new Error(error)
   }
}

export async function getProfile({ username }) {
   try {
      const { data } = await axiosInstance.get(`/freelancer/user/${username}`,)

      const profileData = data.data

      profileData.created_at = formatDate(data?.data?.created_at).format("MMM YYYY")

      profileData.gig = transformServicesData(
         {
            data: profileData.gig.map(gig => {
               return {
                  ...gig,
                  user: data.data
               }
            })
         }
      )

      return {
         ...data,
         data: profileData
      }
   } catch (error) {
      throw new Error(error)
   }
}

export async function getServiceByID({ id }) {
   try {
      const { data } = await axiosInstance.get(`/freelancer/services/${id}`)

      if (data.data.length === 0) {
         throw new Error("No Data Found")
      }

      const serviceData = data.data[0]
      const packageGigs = data.data[0]?.package_gigs

      serviceData.package_gigs = {
         basic: transformScope(packageGigs.find(packageGig => {
            return packageGig?.level_package === 'basic' || packageGig?.level_package === 'Basic'
         })),
         medium: transformScope(packageGigs.find(packageGig => {
            return packageGig?.level_package === 'medium' || packageGig?.level_package === 'Medium'
         })),
         premium: transformScope(packageGigs.find(packageGig => {
            return packageGig?.level_package === 'premium' || packageGig?.level_package === 'Premium'
         }))
      }

      function transformScope(gigPackage) {
         gigPackage?.scopes_package_gigs?.map(scope => {

            switch (scope.scope_id) {
               case '1':
                  scope.name = 'Source File'
                  break;
               case '2':
                  scope.name = 'Sourcing Strategy'
                  break;
               case '3':
                  scope.name = 'Budget Analysis'
                  break;
               default:
                  scope.name = 'Commercial Use'
            }

            return scope
         })

         return gigPackage
      }

      serviceData.hasPackage = packageGigs.length > 0

      return {
         ...data,
         data: serviceData
      }
   } catch (error) {
      throw new Error(error)
   }
}

function transformServicesData(services) {
   return services?.data?.map(service => {
      const descriptionLimit = 70
      const descriptionText = service.description
      const description = descriptionText?.length > descriptionLimit
         ? `${descriptionText?.slice(0, descriptionLimit)} ...`
         : descriptionText

      const first_gig_price = service.package_gigs?.length > 0
         ? service.package_gigs[0].price_package
         : service.package_gig && Object.prototype.hasOwnProperty.call(service.package_gig, 'price_package')
            ? service.package_gig?.price_package
            : null

      let thumbnail = null

      if (service.gig_gallery && service.gig_gallery.gig_photos.length > 0) {
         thumbnail = service.gig_gallery.gig_photos[0].image
      }

      return {
         ...service,
         first_gig_price,
         description,
         thumbnail
      }
   })
}
