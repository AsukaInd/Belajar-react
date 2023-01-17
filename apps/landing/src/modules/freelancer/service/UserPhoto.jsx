import { baseURL } from '@/lib/axios';
import clsx from 'clsx';

export function UserPhoto({ src, firstName, className = "h-[40px] w-[40px]", alt }) {
   return src
      ? (
         <img
            className={clsx("rounded-full", className)}
            src={`${baseURL}/${src}`}
            alt={alt}
         />
      )
      : (
         <div
            className={clsx(
               "uppercase grid place-content-center rounded-full bg-blue-custom text-white text-[24px]",
               className
            )}
         >
            {firstName ? firstName?.at(0) : ""}
         </div>
      );
}
