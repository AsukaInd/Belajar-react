import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { UserPhoto } from "../service/UserPhoto";

export function DetailOverview({ title, userData }) {
   return (
      <div id="Overview" className="text-black-custom">
         <h1 className="mb-[40px] font-medium text-[30px]">{title}</h1>
         <div className="mb-[40px] flex items-center gap-4">
            <Link href={`/freelancer/${userData.username}`}>
               <a>
                  <UserPhoto
                     className="h-20 w-20"
                     firstName={userData.first_name}
                     src={userData.photo}
                  />
               </a>
            </Link>
            <div>
               <div className="text-xl font-semibold mb-[6px]">
                  <Link href={`/freelancer/${userData.username}`}>
                     <a className="hover:underline capitalize">
                        {userData.first_name} {userData.last_name}
                     </a>
                  </Link> - <span className="font-normal">Level {userData.rank?.level} Seller</span>
               </div>
               <div className="flex flex-col md:flex-row items-start md:items-center gap-[6px]">
                  <div className="flex items-center gap-2 text-[#FF8941]">
                     <FaStar size={16} />
                     <span className="text-xl font-medium">{userData.star}</span>
                  </div>
                  <span className="text-xl">({userData.review_count} Reviews) | {userData.orders_in_queue} Orders In Queue</span>
               </div>
            </div>
         </div>
      </div>
   )
}