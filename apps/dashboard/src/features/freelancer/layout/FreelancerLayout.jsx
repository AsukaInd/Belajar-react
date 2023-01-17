import { Outlet } from "react-router-dom";
import { useState, Suspense } from "react";
import { AppMenu } from "./AppMenu";
import { classNames } from "primereact/utils";

export function FreelancerLayout() {
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

   function onMenuButtonClick(event) {
      menuClick = true;

      if (isDesktop()) setDesktopMenuActive((prevState) => !prevState);
      else setMobileMenuActive((prevState) => !prevState);

      event.preventDefault();
   }

   function onMobileTopbarButtonClick(event) {
      setMobileTopbarActive((prevState) => !prevState);
      event.preventDefault();
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
         <Suspense fallback={null}>
            <AppMenu
               onMenuItemClick={onMenuItemClick}
               onMenuClick={onMenuClick}
            />
         </Suspense>

         <div className="layout-main">
            <Outlet />
         </div>

         {mobileMenuActive && <div className="layout-mask modal-in" />}
      </div>
   );
}