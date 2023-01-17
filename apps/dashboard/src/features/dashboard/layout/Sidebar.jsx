import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
import { useAuth } from "~/features/auth/useAuth";

import { IconFolderCheckFill } from '~/components/icons/IconFolderCheckFill'
import { IconSearchAltFill } from '~/components/icons/IconSearchAltFill'
import { IconBagAltFill } from '~/components/icons/IconBagAltFill'
import { IconUserBoxFill } from '~/components/icons/IconUserBoxFill'
import { IconPaperFill } from '~/components/icons/IconPaperFill'

import { IconBookmark } from '~/components/icons/IconBookmark'

import { IconDashboardTwo } from '~/components/icons/IconDashboardTwo'
import { IconLocalPin } from '~/components/icons/IconLocalPin'
import { IconUserCircle } from '~/components/icons/IconUserCircle'
import { IconStar } from '~/components/icons/IconStar'
import { IconLocation } from '~/components/icons/IconLocation'
import { IconUsers } from '~/components/icons/IconUsers'
import { IconInbox } from '~/components/icons/IconInbox'
import { IconBagAlt } from '~/components/icons/IconBagAlt'
import { IconHardHat } from '~/components/icons/IconHardHat'
import { IconFolders } from '~/components/icons/IconFolders'
import { IconMonitor } from '~/components/icons/IconMonitor'
import { IconCarSideview } from '~/components/icons/IconCarSideview'
import { IconSearch } from '~/components/icons/IconSearch'
import { IconMallBag } from '~/components/icons/IconMallBag'
import { IconBuildingFour } from '~/components/icons/IconBuildingFour'
import { IconCreditCard } from '~/components/icons/IconCreditCard'
import { IconInvoice } from '~/components/icons/IconInvoice'
import { IconGear } from '~/components/icons/IconGear'
import { IconPaper } from '~/components/icons/IconPaper'
import { IconPaperAlt } from '~/components/icons/IconPaperAlt'
import { IconGroup } from '~/components/icons/IconGroup'
import { IconDashboard } from '~/components/icons/IconDashboard'
import { IconBook } from '~/components/icons/IconBook'
import { IconCalendarAdd } from '~/components/icons/IconCalendarAdd'
import { IconUserBox } from '~/components/icons/IconUserBox'
import { IconLineAlt } from '~/components/icons/IconLineAlt'
import { IconBookOpen } from '~/components/icons/IconBookOpen'
import { IconChatSearch } from '~/components/icons/IconChatSearch'
import { SidebarMainMenuItem } from "../../../components/SidebarMainMenuItem";
import { SidebarCategoryMenuItem } from "../../../components/SidebarCategoryMenuItem";
import { SidebarMainMenuCollapsible } from "./SidebarMainMenuCollapsible";

export const facilityManagementLinks = [
   {
      icon: <IconDashboardTwo />,
      label: "Dashboard",
      to: "/facility-management",
   },
   {
      isCollapsible: true,
      collapsibleName: 'Setup',
      list: [
         // {
         //    icon: <IconUserCircle />,
         //    label: "Clients",
         //    to: "/facility-management/client",
         // },
         {
            icon: <IconLocalPin />,
            label: "Sites",
            to: "/facility-management/site",
         },
         {
            icon: <IconLocation />,
            label: "Tour Stops",
            to: "/facility-management/site/tour-stops",
         },
         {
            icon: <IconUsers />,
            label: "Visitors",
            to: "/facility-management/visitors",
         },
         {
            icon: <IconInbox />,
            label: "Assets",
            to: "/facility-management/assets",
         },
         {
            icon: <IconHardHat />,
            label: "Vendors",
            to: "/facility-management/vendors",
         },
         {
            icon: <IconBuildingFour />,
            label: "Host",
            to: "/facility-management/host",
         },
      ]
   },
   {
      isCollapsible: true,
      collapsibleName: 'Reports',
      list: [
         {
            icon: <IconFolders />,
            label: "Work Order",
            to: "/facility-management/reports/work-order",
         },
         {
            icon: <IconMonitor />,
            label: "Visitor Log",
            to: "/facility-management/reports/visitor-log",
         },
         {
            icon: <IconCarSideview />,
            label: "Vehicle Log",
            to: "/facility-management/reports/vehicle-log",
         },
         {
            icon: <IconSearch />,
            label: "Field Inspections",
            to: "/facility-management/reports/field-inspections",
         },
      ]
   }
]

const productInspectionLinks = [
   {
      icon: <IconDashboard />,
      label: "Dashboard",
      to: "/product-inspection",
   },
   {
      icon: <IconUserBox />,
      label: "Company",
      to: "/product-inspection/company",
   },
   {
      icon: <IconBookOpen />,
      label: "Contact",
      to: "/product-inspection/contact",
   },
   {
      icon: <IconBook />,
      label: "Book Now",
      to: "/product-inspection/book-now",
   },
   {
      icon: <IconCalendarAdd />,
      label: "Schedule",
      to: "/product-inspection/schedule",
   },
   {
      icon: <IconLineAlt />,
      label: "Report",
      to: "/product-inspection/report",
   },
   {
      icon: <IconChatSearch />,
      label: "Work Action",
      to: "/product-inspection/work-action",
   },
]

const userProfileSettingLinks = [
   {
      icon: <IconUserCircle className="h-[20px] w-[20px]" />,
      label: "Profile",
      to: "/user-profile-setting",
   },
   {
      icon: <IconGroup />,
      label: "User Group",
      to: "/user-profile-setting/user-group",
   },
   {
      icon: <IconStar />,
      label: "Permission",
      to: "/user-profile-setting/permission",
   },
]

const subscriptionSettingLinks = [
   {
      icon: <IconPaper />,
      label: "Your Subscription",
      to: "/subscription-setting",
   },
   {
      icon: <IconPaperAlt />,
      label: "Payment History",
      to: "/subscription-setting/payment-history",
   }
]

export function Sidebar(props) {
   const { t } = useTranslation();
   const sidebarRef = useRef(null);
   const { logout } = useAuth();
   const location = useLocation()
   const pathname = location.pathname?.split('/')

   const activeMenuCategory = pathname[1]
   const activeMainMenu = location.pathname

   const categoryBgRef = useRef(null)
   const activeCategoryMenuRef = useRef(null)

   const stickRef = useRef(null)
   const activeMainMenuRef = useRef(null)
   const [isHover, setIsHover] = useState(false)

   const menuList = {
      'facility-management': {
         name: 'Facility Management',
         icon: <IconFolderCheckFill />,
         links: facilityManagementLinks
      },
      'product-inspection': {
         name: 'Product Inspection',
         icon: <IconSearchAltFill />,
         links: productInspectionLinks
      },
      'user-profile-setting': {
         name: 'User Profile Setting',
         icon: <IconUserBoxFill />,
         links: userProfileSettingLinks
      },
      'subscription-setting': {
         name: 'Subscription Setting',
         icon: <IconPaperFill />,
         links: subscriptionSettingLinks
      }
   }

   return (
      <div
         className="menu-wrapper top-[72px] w-[306px] shadow-none border-right-1"
         onClick={props.onMenuClick}
         style={{ borderColor: "var(--gray-50)" }}
      >
         <div className="layout-menu-container" ref={sidebarRef}>
            <div className="overflow-auto flex h-full">
               <div className="layout-menu pt-[18px] w-[122px] bg-[#FAFBFF] h-full p-[12px]">
                  <ul role="menu">
                     {
                        Object.entries(menuList).map(([objKey, value]) => {
                           return (
                              <SidebarCategoryMenuItem
                                 activeCategoryMenuRef={activeCategoryMenuRef}
                                 categoryBgRef={categoryBgRef}
                                 key={value.name}
                                 objKey={objKey}
                                 menu={value}
                                 activeMenuCategory={activeMenuCategory}
                                 setMobileMenuActive={props.setMobileMenuActive}
                              />
                           )
                        })
                     }
                     <li>
                        <div
                           ref={categoryBgRef}
                           className="bg-[#F4F6FF] transition-[top] absolute z-1 rounded-[8px]"
                        ></div>
                     </li>
                  </ul>
               </div>
               <div
                  className="layout-menu pt-[6px] w-[184px] border-solid border-l border-y-0 border-r-0 border-[#F4F6FF]"
               >
                  <ul role="menu" className="first:mt-[12px] xl:last:mb-[72px]">
                     {
                        menuList[pathname[1]]?.links.map((link, index) => {

                           if (link.isCollapsible) {
                              return (
                                 <SidebarMainMenuCollapsible
                                    isHover={isHover}
                                    setIsHover={setIsHover}
                                    stickRef={stickRef}
                                    activeMainMenuRef={activeMainMenuRef}
                                    activeMainMenu={activeMainMenu}
                                    setMobileMenuActive={props.setMobileMenuActive}
                                    name={link.collapsibleName}
                                    list={link.list}
                                    key={index}
                                 />
                              )
                           }

                           return (
                              <SidebarMainMenuItem
                                 isHover={isHover}
                                 setIsHover={setIsHover}
                                 stickRef={stickRef}
                                 activeMainMenuRef={activeMainMenuRef}
                                 key={index}
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
                           className="bg-[#2854F6] transition-[top] invisible h-[24px] w-[3px] absolute z-1 rounded-md"
                        ></div>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   )
}
