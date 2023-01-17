import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { SwiperNavigationButton } from '@/components/Swiper';
import clsx from 'clsx';
import { baseURL } from '@/lib/axios';

export function ImageSwiper({ images }) {

   const imageStyle = 'w-full md:h-[380px] 2xl:h-[480px] rounded-[10px] object-cover select-none'

   return (
      <div className="slider-container">
         <Swiper
            autoplay={{
               delay: 2500,
               disableOnInteraction: false
            }}
            className="rounded-[10px] relative"
            pagination={{ el: ".pagination", clickable: true }}
            modules={[Navigation, Pagination, Autoplay]}
         >
            <SwiperNavigationButton buttonClassName="border-white" />
            {
               images?.length > 0
                  ? (
                     <>

                        {images?.map((item, idx) => (
                           <SwiperSlide key={idx}>
                              <img
                                 className={imageStyle}
                                 src={`${baseURL}/${item.image}`}
                              />
                           </SwiperSlide>
                        ))}
                     </>
                  )
                  : (
                     <div
                        className={clsx(
                           "grid h-[180px] place-content-center bg-white border border-[#dddddd]",
                           imageStyle
                        )}
                     >
                        No Image Avaliable
                     </div>
                  )
            }
         </Swiper>
         <div className="pagination flex justify-center my-4 text-red-500"></div>
      </div>
   );
}

