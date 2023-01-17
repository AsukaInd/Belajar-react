import { useSwiper } from 'swiper/react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import clsx from 'clsx';

export function SwiperNavigationButton({ buttonClassName, iconColor = "text-white" }) {
   const sw = useSwiper();
   const btnStyle = "rounded-full border h-[60px] w-[60px] flex items-center justify-center mx-[20px] absolute top-1/2 transform -translate-y-1/2 z-10";

   return (
      <div>
         <button
            className={clsx(buttonClassName, btnStyle)}
            onClick={() => sw.slidePrev()}
         >
            <FaArrowLeft className={iconColor} size={25} />
         </button>
         <button
            className={clsx("right-0", buttonClassName, btnStyle)}
            onClick={() => sw.slideNext()}
         >
            <FaArrowRight className={iconColor} size={25} />
         </button>
      </div>
   );
}
