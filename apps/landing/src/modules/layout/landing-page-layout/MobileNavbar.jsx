import { Container } from "./Container";
import clsx from "clsx";
import * as Collapsible from '@radix-ui/react-collapsible';
import Link from 'next/link'
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaChevronRight } from "react-icons/fa";
import { ButtonLink, Button } from "@/components/ui/Button";
import { IconGlobeAlt } from "@/components/icons/IconGlobeAlt";

const menuData = [
   {
      name: "Features",
      children: [
         {
            name: "Product Inspection Management",
            link: '#'
         },
         {
            name: "Work Order Management",
            link: '#'
         },
         {
            name: "Guard Tour Management",
            link: '#'
         },
         {
            name: "Visitor Management",
            link: '#'
         }
      ]
   },
   {
      name: "Resources",
      children: [
         {
            name: "Resources 1",
            link: '#'
         },
         {
            name: "Resources 2",
            link: '#'
         },
         {
            name: "Resources 3",
            link: '#'
         },
      ]
   },
   {
      name: "Pricing",
      link: '#'
   },
   {
      name: "About",
      link: '#'
   },
   {
      name: "Contact",
      link: '#'
   }
]

export function MobileNavbar({ isOpen }) {
   return (
      <nav
         className={clsx(
            "absolute inset-0 bg-white z-40 pt-4 overflow-y-auto",
            [isOpen ? "block" : "hidden"]
         )}
      >
         <Container className="h-full">
            <div className="flex justify-between items-center pt-12">
               <Link href="#">
                  <a className="text-blue-custom font-[600]">
                     Hire Inspector
                  </a>
               </Link>
               <Button
                  className="px-3"
                  iconLeft={<IconGlobeAlt />}
                  iconRight={<FaChevronDown />}
               >
                  EN
               </Button>
            </div>
            <div className="text-[16px] flex flex-col mb-4">
               {
                  menuData.map((menu, index) => {
                     if (menu.children) {
                        return <SubMenu key={index} menu={menu} />
                     }

                     return (
                        <Link key={index} href={menu.link}>
                           <a>
                              <NavbarItem>{menu.name}</NavbarItem>
                           </a>
                        </Link>
                     )
                  })
               }
            </div>
            <div className="pb-4 flex justify-between items-center">
               <ButtonLink
                  contained
                  href="#"
                  iconRight={<FaChevronRight className="mt-[2.5px]" size={10} />}
               >
                  Start for free
               </ButtonLink>
               <ButtonLink contained href="#">Login</ButtonLink>
            </div>
         </Container>
      </nav>
   );
}

function SubMenu({ menu }) {
   const [open, setOpen] = useState(true)

   return (
      <Collapsible.Root open={open} onOpenChange={setOpen}>
         <Collapsible.Trigger className="w-full text-left">
            <NavbarItem>
               {menu.name}
               <div className="mr-3">
                  {open ? <FaChevronUp /> : <FaChevronDown />}
               </div>
            </NavbarItem>
         </Collapsible.Trigger>
         <Collapsible.Content>
            <div className="flex flex-col gap-6 pb-4">
               {
                  menu.children.map((subMenu, index) => {
                     return (
                        <Link key={index} href={subMenu.link}>
                           <a className="text-[14px]">{subMenu.name}</a>
                        </Link>
                     )
                  })
               }
            </div>
         </Collapsible.Content>
      </Collapsible.Root>
   )
}

function NavbarItem({ children }) {
   return (
      <div
         className="py-4 font-semibold flex items-center justify-between text-black-custom"
      >
         {children}
      </div>
   )
}
