import { NavLink } from "react-router-dom";
import { classNames } from "primereact/utils";
import { useEffect } from "react";

const mainMenuPadding = 11
const headerHeight = 72

export function SidebarMainMenuItem(props) {
   const {
      link,
      activeMainMenu,
      setMobileMenuActive,
      activeMainMenuRef,
      stickRef,
      isHover,
      setIsHover
   } = props
   const currentPath = link.to
   const isActive = getActivePath()

   function getActivePath() {
      const pathWithId = ['work-order', 'visitor-log', 'visitors', 'site']
      const defaultPath = activeMainMenu === currentPath

      if (pathWithId.findIndex((id) => activeMainMenu.includes(id)) !== -1) {
         const splitPath = activeMainMenu.split('/')
         const hasId = Number(splitPath[splitPath.length - 1])
         const removedId = splitPath.slice(0, splitPath.length - 1).join('/')

         return hasId ? removedId === currentPath : defaultPath
      }

      return defaultPath
   }

   function updateStickStyle({ top }) {
      stickRef.current.style.top = `${top - headerHeight + mainMenuPadding}px`
   }

   function onMouseOver(event) {
      const size = event.currentTarget.getBoundingClientRect()

      setIsHover(true)
      updateStickStyle({ top: size.top })
      stickRef.current.style.visibility = 'visible'
   }

   function onMouseLeave() {
      const size = activeMainMenuRef.current?.getBoundingClientRect()

      setIsHover(false)
      updateStickStyle({ top: size?.top })
      stickRef.current.style.visibility = 'hidden'
   }

   useEffect(() => {
      if (activeMainMenuRef.current) {
         const size = activeMainMenuRef.current?.getBoundingClientRect()

         updateStickStyle({ top: size.top })
      }
   }, [isActive])

   return (
      <li className="relative">
         <div
            className={classNames(
               "bg-[#2854F6] absolute h-[24px] w-[3px] rounded-md ",
               [isActive && !isHover ? 'opacity-100' : 'opacity-0']
            )}
            style={{ top: mainMenuPadding }}
         ></div>
         <NavLink
            to={link.to}
            ref={isActive ? activeMainMenuRef : null}
            onClick={() => setMobileMenuActive(false)}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
            className={classNames(
               "hover:text-[#2854F6]",
               { "text-[#A7A7A7]": !isActive }
            )}
            style={{
               padding: 0
            }}
         >
            <div className={classNames(
               "text-[12px] font-medium rounded-[8px] mx-[12px]",
               "mb-[8px] flex items-center w-full relative z-2 py-[14px] px-[12px]",
               { 'bg-[#F4F6FF] text-[#2854F6] font-bold': isActive }
            )}>
               {link.icon}
               <span className="ml-[12px]">{link.label}</span>
            </div>
         </NavLink>
      </li>
   )
}