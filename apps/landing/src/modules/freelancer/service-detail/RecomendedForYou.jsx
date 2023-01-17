import { freelancerServiceData } from "../service/freelancerServiceData";
import { ServiceItem } from "../service/ServiceItem";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { SwiperNavigationButton } from '@/components/Swiper';

export function RecomendedForYou() {
   return (
      <div id="Recommendations">
         <h1 className="text-[30px] font-bold mb-[34px]">Recommended For You</h1>
         <div className="slider-container">
            <Swiper
               breakpoints={{
                  // width >= 640px
                  640: {
                     slidesPerView: 1,
                  },
                  // width >= 768px
                  768: {
                     slidesPerView: 2,
                  },
               }}
               className="rounded-[10px] relative"
               spaceBetween={36}
               modules={[Navigation]}
            >
               <SwiperNavigationButton
                  iconColor="text-blue-custom"
                  buttonClassName="border-blue-custom bg-white top-[170px]"
               />
               {freelancerServiceData.map((item, idx) => (
                  <SwiperSlide key={idx}>
                     <ServiceItem
                        className="drop-shadow-none"
                        bannerClassName="h-[220px]"
                        key={item.id}
                        item={item}
                     />
                  </SwiperSlide>
               ))}
            </Swiper>
         </div>
      </div>
   )
}
