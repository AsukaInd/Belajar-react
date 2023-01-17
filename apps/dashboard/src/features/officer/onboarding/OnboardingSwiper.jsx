import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper';
import React, { useState } from "react";
import { classNames } from "primereact/utils";
import { Link } from 'react-router-dom';
import { Container } from '../components/Container';

export function OnboardingSwiper() {
   const [isReachEnd, setIsReachEnd] = useState(false)
   const [isFinish, setIsFinish] = useState(false)

   const images = [
      "/images/onboarding-images/image-1.png",
      "/images/onboarding-images/image-2.png",
      "/images/onboarding-images/image-3.png",
      "/images/onboarding-images/image-4.png",
      "/images/onboarding-images/image-5.png",
   ]

   return (
      <Container>
         <div className="slider-container relative bg-blue-3 h-screen overflow-hidden" >
            <Swiper
               autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                  stopOnLastSlide: true
               }}
               fadeEffect={{ crossFade: true }}
               effect="fade"
               onReachEnd={() => setIsReachEnd(true)}
               onActiveIndexChange={(swiper) => {
                  if (swiper.activeIndex !== images.length - 1) {
                     setIsReachEnd(false)
                  }
               }}
               className="static"
               pagination={{ el: ".pagination", clickable: true }}
               modules={[Navigation, Pagination, Autoplay, EffectFade]}
            >
               {
                  images?.length > 0
                     ? (
                        <>

                           {images?.map((item, idx) => (
                              <SwiperSlide key={idx}>
                                 <img
                                    className={classNames(
                                       "w-full h-screen object-cover select-none transition-all transform",
                                       [
                                          isReachEnd
                                             ? '-translate-y-[47px]'
                                             : isFinish
                                                ? 'scale-75 -translate-y-[60px] rounded-[24px] drop-shadow-[0px_0px_48px_rgba(0,0,0,0.25)]'
                                                : 'scale-100'
                                       ],
                                    )}
                                    src={`${item}`}
                                 />
                              </SwiperSlide>
                           ))}
                        </>
                     )
                     : null
               }
               <BottomBar isReachEnd={isReachEnd} isFinish={isFinish} setIsFinish={setIsFinish} />
            </Swiper>
         </div >
      </Container >
   )
}

function BottomBar({ isReachEnd, setIsFinish, isFinish }) {
   const swiper = useSwiper();

   return (
      <>
         <div className="absolute bottom-0 left-0 right-0 z-20 grid grid-cols-3 items-center px-3 h-[47px]">
            <div className="pagination col-start-2 flex justify-center items-center"></div>
            <button
               className={
                  classNames(
                     "bg-white rounded-full py-[4px] transition-transform px-[8px] text-blue-2 font-bold justify-self-end",
                     [isReachEnd ? 'translate-y-0' : 'translate-y-[47px]']
                  )
               }
               onClick={() => {
                  swiper.slideTo(0)
                  swiper.disable()
                  setIsFinish(true)
               }}
            >
               Finish
            </button>
         </div>
         <div
            className={
               classNames(
                  'transform absolute bottom-0 left-0 right-0 z-30 bg-white p-[24px] rounded-t-2xl shadow-[0px_-4px_8px_rgba(36,35,35,0.05)]',
                  'transition-transform',
                  [isFinish ? 'translate-y-0' : 'translate-y-[300px]']
               )
            }
         >
            <h1 className='text-[21px] font-[900] mb-[12px]'>
               Professional <span className='text-blue-4'>Product Inspection</span> Team For Your [Example]
            </h1>
            <p className='text-grey-1 mb-[45px] text-[16px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
            <Link
               className='bg-blue-4 w-full mb-[21px] block rounded-[6px] py-[16px] text-center text-white font-bold'
               to="/officer/login"
            >
               Member Log in
            </Link>
            <Link
               className='text-blue-4 text-center w-full block font-bold'
               to="/officer/register"
            >
               Haven&apos;t joined? Register here
            </Link>
         </div>
      </>
   )
}