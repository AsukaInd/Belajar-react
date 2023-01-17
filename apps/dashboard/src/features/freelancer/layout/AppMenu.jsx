import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { classNames } from "primereact/utils";
import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { Button } from "primereact/button";
import { useProfile } from "~/features/freelancer/hooks/useProfile";
import { Menu } from "primereact/menu";
import { useAuth } from "~/features/auth/useAuth";

import "./appMenu.scss";
import { dataToOption } from "../../../utils/dataToOptions";

export function AppMenu(props) {

   const { t } = useTranslation();
   const { status, data } = useProfile();
   const menu = useRef(null);
   const sidebarRef = useRef(null);
   const navigate = useNavigate();
   const { logout } = useAuth();

   function handleLogout() {
      logout();
      window.localStorage.removeItem('username')
   }

   const menus = {
      Menu: [
         {
            icon: "/icons/UserCircle.svg",
            label: "Order list",
            to: "/freelancer",
         },
         {
            icon: "/icons/Folders.svg",
            label: "My Gigs",
            to: "/freelancer/gigs",
         },
         {
            icon: "/icons/star.svg",
            label: "Gigs",
            to: "/freelancer/gigs/1",
         },
         {
            icon: "/icons/Users.svg",
            label: status === 'loading'
               ? 'loading...'
               : status === 'error' || (status === 'success' && data?.data?.is_freelancer === '0')
                  ? "Complete Your Profile"
                  : "Profile",
            to: status === 'error' || (status === 'success' && data?.data?.is_freelancer === '0')
               ? "/freelancer/register/1"
               : "/freelancer/my-profile",
         },
      ],
   }

   const setup = [
      {
         label: "Logout",
         icon: <img className="ml-auto flex-order-1" src="/icons/Logout.svg" />,
         command: handleLogout,
      },
      {
         label: "Edit Profile",
         icon: (
            <img className="ml-auto flex-order-1" src="/icons/Profile.svg" />
         ),
         // command: () => navigate('/dashboard/profile'),
      },
   ];

   function popupToggle(event) {
      menu.current.toggle(event);
   }

   return (
      <>
         <div
            className="menu-wrapper shadow-none border-right-1"
            onClick={props.onMenuClick}
            style={{ borderColor: "var(--gray-50)" }}
         >
            <div className="layout-menu-container" ref={sidebarRef}>
               <div className="p-3 overflow-auto">
                  <img className="my-1" src="/inspxt-logo.png" />
                  <ul role="menu" className="layout-menu p-2 mb-8">
                     <MenuItem
                        item={{
                           icon: "/icons/dashboard-two.svg",
                           label: t("freelancer.sidebar-menu.dashboard"),
                           to: "/freelancer",
                        }}
                        onMenuItemClick={props.onMenuItemClick}
                        className="border-y-1 border-noround py-2"
                        style={{ borderColor: "var(--gray-50)" }}
                     />
                     {Object.entries(menus).map(([key, value], index) => {
                        return (
                           <MenuWrapper
                              key={key}
                              name={key}
                              index={index}
                              onMenuItemClick={props.onMenuItemClick}
                              menus={value}
                           />
                        );
                     })}
                  </ul>
               </div>
               <Menu
                  className="popup-menu"
                  appendTo={sidebarRef.current}
                  popup
                  ref={menu}
                  model={setup}
               />
               <div className="fixed left-0 right-0 bottom-0 bg-white p-3">
                  <button
                     className="bg-gray-200 card shadow-none flex align-items-center justify-content-between w-full hover:bg-gray-300 cursor-pointer border-none"
                     onClick={handleLogout}
                  >
                     Log Out
                     <img className="ml-auto flex-order-1" src="/icons/Logout.svg" />
                  </button>
               </div>
            </div>
         </div>
      </>
   );
}

function MenuWrapper(props) {
   const [isOpen, setIsOpen] = useState(true);

   function toggle() {
      setIsOpen((prev) => !prev);
   }

   return (
      <div
         className="border-bottom-1 py-4"
         style={{ borderColor: "var(--gray-50)" }}
      >
         <li
            onClick={toggle}
            className="px-3 flex align-items-center justify-content-between"
         >
            <span
               className="capitalize text-sm font-bold"
               style={{ color: "var(--accent-text-color)" }}
            >
               {props.name}
            </span>
            <button className="bg-white border-none p-0">
               {isOpen ? (
                  <i
                     className="fa-solid fa-chevron-up"
                     style={{ color: "var(--accent-text-color)" }}
                  ></i>
               ) : (
                  <i
                     className="fa-solid fa-chevron-down"
                     style={{ color: "var(--accent-text-color)" }}
                  ></i>
               )}
            </button>
         </li>
         <CSSTransition
            classNames="app-menu-transition"
            in={isOpen}
            timeout={1000}
            unmountOnExit
         >
            <MenuList
               onMenuItemClick={props.onMenuItemClick}
               list={props.menus}
            />
         </CSSTransition>
      </div>
   );
}

function MenuList(props) {
   return (
      <div>
         {props.list.map((item, index) => {
            return (
               <MenuItem
                  className={classNames({ "mt-4": index === 0 })}
                  key={item.to}
                  item={item}
                  onMenuItemClick={props.onMenuItemClick}
               />
            );
         })}
      </div>
   );
}

function MenuItem({ item, className, onMenuItemClick, ...props }) {
   const location = useLocation();

   return (
      <li
         onClick={(e) => onMenuItemClick({ originalEvent: event, item })}
         role="menuitem"
         className={className}
         {...props}
      >
         <NavLink
            to={item.to}
            className={classNames({
               "router-link-active": item.to === location.pathname,
            })}
         >
            <img src={item.icon} />
            <span className="layout-menuitem-text text-sm">{item.label}</span>
         </NavLink>
      </li>
   );
}
