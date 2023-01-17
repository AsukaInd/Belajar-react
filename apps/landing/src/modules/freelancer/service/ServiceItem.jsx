import clsx from 'clsx'
import { FaHeart, FaStar } from "react-icons/fa";
import Link from 'next/link'
import { UserPhoto } from './UserPhoto';
import { baseURL } from '@/lib/axios';

export function ServiceItem({ item, bannerClassName, className }) {
   const profileLink = `/freelancer/${item?.user?.username}`
   const detailLink = `/freelancer/${item?.user?.username}/${item?.id}`

   return (
      <div
         className={clsx(
            "flex flex-col justify-between rounded-[10px] bg-white border border-[#DDDDDD]",
            "drop-shadow-[0px_20px_40px_rgba(0,0,0,0.1)]",
            className
         )}
      >
         <Link href={detailLink}>
            <a className='block w-full'>
               <ServiceItemImage
                  className={bannerClassName}
                  src={item.thumbnail}
               />
            </a>
         </Link>
         <div className="p-[20px]">
            <div className="flex items-center gap-[15px]">
               <Link href={profileLink}>
                  <a>
                     <UserPhoto
                        firstName={item?.user?.first_name}
                        src={item?.user?.photo}
                     />
                  </a>
               </Link>
               <div className="flex flex-col">
                  <Link href={profileLink}>
                     <a className="font-semibold text-[16px] hover:text-blue-custom">
                        {item?.user?.first_name} {item?.user?.last_name}
                     </a>
                  </Link>
                  <span>Level {item?.user?.rank?.level} Seller</span>
               </div>
            </div>
            <div className="my-[14px]">
               <Link href={detailLink}>
                  <a className="hover:underline">{item?.description}</a>
               </Link>
            </div>
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-[10px]">
                  <div className="flex items-center gap-1">
                     <FaStar className="mb-[1px] text-[#FF8941]" />
                     <span className="text-[#FF8941] font-semibold">
                        {item?.rating}
                     </span>
                  </div>
                  <span className="text-[12px]">({item?.review} Review)</span>
               </div>
               <div>
                  <FaHeart className="text-[#DDDDDD]" />
               </div>
            </div>
         </div>
         <Link href={detailLink}>
            <a className="bg-blue-custom text-white text-center rounded-b-[10px] py-4">
               Starting At <b>${item?.first_gig_price}</b>
            </a>
         </Link>
      </div>
   );
}

function ServiceItemImage({ className, src }) {
   const defaultStyle = "h-[300px] md:h-[180px] w-full rounded-t-[10px] object-cover"

   return src
      ? (
         <img
            className={clsx(
               defaultStyle,
               className
            )}
            src={`${baseURL}/${src}`}
         />
      )
      : (
         <div
            className={clsx(
               "grid place-content-center border-b border-[#dddddd]",
               defaultStyle,
               className
            )}
         >
            No Image Avaliable
         </div>
      )
}

