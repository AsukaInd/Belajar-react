import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { classNames } from "primereact/utils";
import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { Button } from "primereact/button";
import { useProfile } from "~/features/dashboard/hooks/useProfile";
import { Menu } from "primereact/menu";
import { useAuth } from "~/features/auth/useAuth";

import "./appMenu.scss";

export function AppMenu(props) {
   const { t } = useTranslation();
   const { status, data } = useProfile();
   const menu = useRef(null);
   const sidebarRef = useRef(null);
   const navigate = useNavigate();
   const { logout } = useAuth();

   function handleLogout() {
      logout();
   }

   const menus = {
      setup: [
         {
            icon: "/icons/UserCircle.svg",
            label: t("dashboard.sidebar-menu.client"),
            to: "/dashboard/client",
         },
         {
            icon: "/icons/star.svg",
            label: "Users",
            to: "/dashboard/client/users",
         },
         {
            icon: "/icons/local-pin.svg",
            label: "Sites",
            to: "/dashboard/site",
         },
         {
            icon: "/icons/location.svg",
            label: "Tour Stops",
            to: "/dashboard/site/tour-stops",
         },
         {
            icon: "/icons/Users.svg",
            label: "Visitors",
            to: "/dashboard/visitors",
         },
         {
            icon: "/icons/inbox.svg",
            label: "Assets",
            to: "/dashboard/assets",
         },
         {
            icon: "/icons/u_bag-alt.svg",
            label: "Inventory",
            to: "/dashboard/inventory",
         },
         {
            icon: "/icons/u_hard-hat.svg",
            label: "Vendors",
            to: "/dashboard/vendors",
         },
      ],
      inspection: [
         {
            icon: "/icons/bookmark.svg",
            label: "Dashboard",
            to: "/dashboard/product-inspection/",
         },
         {
            icon: "/icons/bookmark.svg",
            label: "Book Now",
            to: "/dashboard/product-inspection/book-now",
         },
      ],
      // 'list type': [
      //    {
      //       icon: "fa-solid fa-chevron-up",
      //       label: t("dashboard.type-list.equipment-type"),
      //       to: "/dashboard/equipment-type",
      //    },
      //    {
      //       icon: "fa-solid fa-chevron-up",
      //       label: t("dashboard.type-list.incident-type"),
      //       to: "/dashboard/incident-type",
      //    },
      //    {
      //       icon: "fa-solid fa-chevron-up",
      //       label: t("dashboard.type-list.maintenance-type"),
      //       to: "/dashboard/maintenance-type",
      //    },
      //    {
      //       icon: "fa-solid fa-chevron-up",
      //       label: t("dashboard.type-list.observation-type"),
      //       to: "/dashboard/observation-type",
      //    },
      //    {
      //       icon: "fa-solid fa-chevron-up",
      //       label: t("dashboard.type-list.visitor_id-type"),
      //       to: "/dashboard/visitor-type",
      //    },
      // ],
      freelancer: [
         {
            icon: "/icons/UserCircle.svg",
            label: t("dashboard.sidebar-menu.client"),
            to: "",
         },
         {
            icon: "/icons/star.svg",
            label: "Users",
            to: "",
         },
         {
            icon: "/icons/local-pin.svg",
            label: "Sites",
            to: "",
         },
      ],
      reports: [
         {
            icon: "/icons/Folders.svg",
            label: "Work Order",
            to: "/dashboard/reports/work-order",
         },
         {
            icon: "/icons/Monitor.svg",
            label: "Visitor Log",
            to: "/dashboard/reports/visitor-log",
         },
         {
            icon: "/icons/u_car-sideview.svg",
            label: "Vehicle Log",
            to: "/dashboard/reports/vehicle-log",
         },
         {
            icon: "/icons/u_search.svg",
            label: "Field Inspections",
            to: "/dashboard/reports/field-inspections",
         },
         {
            icon: "/icons/mall-bag.svg",
            label: "Inventory",
            to: "/dashboard/reports/inventory",
         },
      ],
      Account: [
         {
            icon: "/icons/UserCircle.svg",
            label: "My Profile",
            to: "/dashboard/account/my-profile",
         },
         {
            icon: "/icons/building-four.svg",
            label: "Members",
            to: "/dashboard/account/members",
         },
         {
            icon: "/icons/credit-card.svg",
            label: "Subscriptions",
            to: "/dashboard/account/subscriptions",
         },
         {
            icon: "/icons/u_invoice.svg",
            label: "Invoices",
            to: "/dashboard/account/invoices",
         },
         {
            icon: "/icons/gear.svg",
            label: "Settings",
            to: "/dashboard/account/settings",
         },
      ],
   };

   const items = [
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
                           label: t("dashboard.sidebar-menu.dashboard"),
                           to: "/dashboard",
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
                  model={items}
               />
               {status === "success" && (
                  <div className="fixed left-0 right-0 bottom-0 bg-white p-3">
                     <div
                        className="bg-gray-200 card shadow-none flex align-items-center justify-content-between"
                        style={{ borderRadius: "8px" }}
                     >
                        <img
                           className="border-circle"
                           src={data?.data?.photo}
                           height="40"
                           width="40"
                        />
                        <div className="mx-2">
                           <span className="font-bold block">
                              {data?.data?.name}
                           </span>
                           <span className="text-sm text-gray-700">
                              Super admin
                           </span>
                        </div>
                        <Button
                           onClick={popupToggle}
                           icon={
                              <i className="fa-solid fa-ellipsis-vertical"></i>
                           }
                           className="p-button-rounded p-button-text p-button-plain"
                        />
                     </div>
                  </div>
               )}
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