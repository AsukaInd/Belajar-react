import { ProgressSpinner } from "primereact/progressspinner"
import { useProfile } from "../hooks/useProfile"
import { ErrorMessage } from "~/components/ErrorMessage";
import { API_BASE_URL } from "../../../config/apiConfig";

export default function MyProfile() {
   const { status, data, error } = useProfile()
   const profile = data?.data

   return (
      <div className="layout-content">
         {
            status === 'loading'
               ? (
                  <div className="vh-center">
                     <ProgressSpinner strokeWidth={3} />
                  </div>
               )
               : status === 'success'
                  ? (
                     <div className="border-solid border-1 border-[#E9E9E9] rounded-xl">
                        <div className="bg-[#FAFBFF] py-[21px] px-[24px]">
                           <h1 className="text-[21px] mb-0">Profile</h1>
                        </div>
                        <div className="py-[21px] px-[24px] grid grid-cols-2 gap-[28px]">
                           <div
                              className="border-solid border-y-0 border-l-0 border-[#E9E9E9] border-r pr-[28px] flex flex-col gap-[38px]"
                           >
                              <div className="flex justify-between items-center">
                                 <p className="font-bold">Profile Image</p>
                                 <img className="rounded-full h-[72px] w-[72px]" src='/dummy-profile.png' />
                              </div>
                              <div className="flex justify-between items-center">
                                 <p className="font-bold">Name</p>
                                 <p className="text-[#7A7A7A]">{profile.first_name} {profile.last_name}</p>
                              </div>
                              <div className="flex justify-between items-center">
                                 <p className="font-bold">Username</p>
                                 <p className="text-[#7A7A7A]">{profile.username}</p>
                              </div>
                           </div>
                           <div className="flex flex-col gap-[28px]">
                              <div className="flex justify-between items-center">
                                 <p className="font-bold">Email</p>
                                 <p className="text-[#7A7A7A]">{profile.email}</p>
                              </div>
                              <div className="flex justify-between items-center">
                                 <p className="font-bold">Address</p>
                                 <p className="text-[#7A7A7A]">{profile?.residence_birth?.address}</p>
                              </div>
                              <div className="flex justify-between items-center">
                                 <p className="font-bold">City</p>
                                 <p className="text-[#7A7A7A]">{profile?.residence_birth?.city}</p>
                              </div>
                              <div className="flex justify-between items-center">
                                 <p className="font-bold">Postal Code</p>
                                 <p className="text-[#7A7A7A]">{profile?.residence_birth?.postal_code}</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  )
                  : <ErrorMessage className="vh-center" error={error} />
         }
      </div >
   )
}