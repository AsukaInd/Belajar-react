import { Outlet } from 'react-router-dom'
import { IconInboxSuccess } from "~/components/icons/IconInboxSuccess";

export function GridViewLayout({ listComponent, title, subtitle, showDetail }) {
   return (
      <div className="bg-[#f4f4f4] h-screen overflow-x-auto">
         <div
            className="my-10 mx-5 grid grid-cols-3 gap-4 md:gap-8 min-w-[970px]"
            style={{
               height: "calc(100vh - (35px * 2))",
               maxHeight: "calc(100vh - (35px * 2))",
            }}
         >
            {listComponent}
            <div className="col-span-2 border-1 border-[#e9e9e9] rounded-md overflow-auto bg-white">
               {
                  showDetail
                     ? <Outlet />
                     : (
                        <div className="bg-white rounded-md h-full flex items-center justify-center">
                           <div className="flex flex-column items-center">
                              <IconInboxSuccess />
                              <h1 className="mb-0 text-[24px]">{title}</h1>
                              <p className="text-[16px] text-[#7A7A7A]">
                                 {subtitle}
                              </p>
                           </div>
                        </div>
                     )
               }
            </div>
         </div>
      </div>
   )
}