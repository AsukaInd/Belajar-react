import { NavLink } from "react-router-dom";
import { classNames } from "primereact/utils";
import { useEffect } from "react";

const headerHeight = 72

export function SidebarCategoryMenuItem(props) {
   const {
      menu,
      activeMenuCategory,
      objKey,
      setMobileMenuActive,
      activeCategoryMenuRef,
      categoryBgRef
   } = props

   const isActive = objKey === activeMenuCategory

   function updateBgStyle({ top, left, width, height }) {
      categoryBgRef.current.style.top = `${top - headerHeight}px`
      categoryBgRef.current.style.left = `${left}px`
      categoryBgRef.current.style.width = `${width}px`
      categoryBgRef.current.style.height = `${height}px`
   }

   function onMouseOver(event) {
      const size = event.currentTarget.getBoundingClientRect()

      updateBgStyle({
         top: size.top,
         left: size.left,
         width: size.width,
         height: size.height
      })
   }

   function onMouseLeave() {
      const size = activeCategoryMenuRef.current?.getBoundingClientRect()
      updateBgStyle({ top: size?.top })
   }

   useEffect(() => {
      if (activeCategoryMenuRef.current) {
         const size = activeCategoryMenuRef.current?.getBoundingClientRect()

         updateBgStyle({
            top: size.top,
            left: size.left,
            width: size.width,
            height: size.height
         })
      }
   }, [isActive])

   return menu.links.length > 0 ? (
      <li>
         <NavLink
            ref={isActive ? activeCategoryMenuRef : null}
            className={classNames(
               'flex flex-column relative z-2 items-center justify-center text-center rounded-[6px]',
               'text-[#7A7A7A] font-medium hover:text-[#2854F6] select-none',
               { 'text-[#2854F6] font-bold': isActive }
            )}
            style={{
               padding: '11px'
            }}
            to={menu.links[0].to}
            onClick={() => setMobileMenuActive(false)}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
         >
            {menu.icon}
            <span className="mt-[12px]">{menu.name}</span>
         </NavLink>
      </li>
   ) : null
}


