import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";

import { IconDashboardTwo } from '~/components/icons/IconDashboardTwo'
import { IconUsers } from '~/components/icons/IconUsers'
import { IconFolders } from '~/components/icons/IconFolders'
import { SidebarMainMenuItem } from "../../../components/SidebarMainMenuItem";

export const facilityManagementLinks = [
   // {
   //    icon: <IconDashboardTwo />,
   //    label: "Dashboard",
   //    to: "/admin/freelancer",
   // },
   {
      icon: <IconUsers />,
      label: "Freelancers",
      to: "/admin/freelancer/freelancers",
   },
   {
      icon: <IconFolders />,
      label: "Gigs",
      to: "/admin/freelancer/gigs",
   }
]

export function FreelancerAdminSidebar(props) {
   const { t } = useTranslation();
   const sidebarRef = useRef(null);
   const location = useLocation()

   const activeMainMenu = location.pathname

   const stickRef = useRef(null)
   const activeMainMenuRef = useRef(null)
   const [isHover, setIsHover] = useState(false)

   return (
      <div
         className="menu-wrapper top-[72px] w-[190px] shadow-none border-right-1"
         onClick={props.onMenuClick}
         style={{ borderColor: "var(--gray-50)" }}
      >
         <div className="layout-menu-container" ref={sidebarRef}>
            <div className="overflow-auto flex h-full">
               <div
                  className="layout-menu pt-[6px] w-[184px] border-solid border-l border-y-0 border-r-0 border-[#F4F6FF]"
               >
                  <ul role="menu" className="first:mt-[12px] xl:last:mb-[72px]">
                     {
                        facilityManagementLinks.map((link) => {
                           return (
                              <SidebarMainMenuItem
                                 isHover={isHover}
                                 setIsHover={setIsHover}
                                 stickRef={stickRef}
                                 activeMainMenuRef={activeMainMenuRef}
                                 key={link.to}
                                 link={link}
                                 activeMainMenu={activeMainMenu}
                                 setMobileMenuActive={props.setMobileMenuActive}
                              />
                           )
                        })
                     }
                     <li>
                        <div
                           ref={stickRef}
                           className="bg-[#2854F6] invisible h-[24px] w-[3px] absolute z-1 rounded-md"
                        ></div>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   )
}
