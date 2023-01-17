import { Outlet } from "react-router-dom";
import { useState, Suspense } from "react";
import { FreelancerAdminSidebar } from "./FreelancerAdminSidebar";
import { classNames } from "primereact/utils";
import { FreelancerAdminHeader } from './FreelancerAdminHeader'

export function FreelancerAdminLayout() {
   const [desktopMenuActive, setDesktopMenuActive] = useState(true);
   const [mobileMenuActive, setMobileMenuActive] = useState(false);
   const [mobileTopbarActive, setMobileTopbarActive] = useState(false);

   let menuClick;

   const layoutContainerClassName = classNames(
      "layout-wrapper",
      "layout-topbar-blue",
      "layout-menu-light",
      "layout-menu-static",
      {
         "layout-menu-active": desktopMenuActive,
         "layout-menu-mobile-active": mobileMenuActive,
         "layout-topbar-mobile-active": mobileTopbarActive,
      }
   );

   const isDesktop = () => window.innerWidth > 1024;

   function hideOverlayMenu() {
      setMobileMenuActive(false);
      setDesktopMenuActive(false);
   }

   function onDocumentClick() {
      if (!menuClick && !isDesktop()) {
         hideOverlayMenu();
      }

      menuClick = false;
   }

   function onMenuClick() {
      menuClick = true;
   }

   function onMenuItemClick(event) {
      if (!event.item.items && !isDesktop()) {
         hideOverlayMenu();
      }
   }

   return (
      <div className={layoutContainerClassName} onClick={onDocumentClick}>
         <FreelancerAdminHeader
            mobileMenuActive={mobileMenuActive}
            setMobileMenuActive={setMobileMenuActive}
         />

         <Suspense fallback={null}>
            <FreelancerAdminSidebar
               onMenuItemClick={onMenuItemClick}
               onMenuClick={onMenuClick}
               setMobileMenuActive={setMobileMenuActive}
            />
         </Suspense>

         <div className="layout-main lg:!ml-[190px]">
            <Outlet />
         </div>

         {mobileMenuActive && <div className="layout-mask modal-in" />}
      </div>
   );
}
