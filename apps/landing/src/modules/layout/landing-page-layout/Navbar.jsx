import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { forwardRef } from 'react'
import { FaAngleDown, FaChevronRight } from "react-icons/fa";
import clsx from 'clsx'
import { ButtonLink } from "@/components/ui/Button";

const NavigationMenuItem = NavigationMenuPrimitive.Item;

function NavigationMenu(props) {
   return (
      <NavigationMenuPrimitive.Root
         className="relative flex justify-between z-10"
         {...props}
      />
   )
}

function NavigationMenuList({ className, ...props }) {
   return (
      <NavigationMenuPrimitive.List
         className={clsx("flex justify-center items-center list-none w-full", className)}
         {...props}
      />
   )
}

const itemDefaultStyle = `py-[8px] outline-none select-none font-medium
text-[14px] text-[#555] focus:relative hover:text-blue-custom`

function StyledTrigger(props) {
   return (
      <NavigationMenuPrimitive.Trigger
         className={`flex items-center justify-between gap-[2px] group ${itemDefaultStyle}`}
         {...props}
      />
   )
}

const NavigationMenuTrigger = forwardRef(({ children, ...props }, forwardedRef) => (
   <StyledTrigger {...props} ref={forwardedRef}>
      {children}
      <FaAngleDown aria-hidden className='group-radix-state-open:rotate-180 transition mt-[3px]' />
   </StyledTrigger>
));

function NavigationMenuContent(props) {
   return (
      <NavigationMenuPrimitive.Content
         className="absolute top-0 left-0 w-full"
         {...props}
      />
   )
}

function NavigationMenuLink(props) {
   return (
      <NavigationMenuPrimitive.Link
         className={`${itemDefaultStyle} block text-[14px]`}
         style={{ textDecoration: 'none' }}
         {...props}
      />
   )
}

const ContentListItem = forwardRef(({ children, ...props }, forwardedRef) => (
   <li>
      <NavigationMenuLink
         {...props}
         ref={forwardedRef}
         className="hover:text-blue-custom"
      >
         <div className='hover:bg-gray-200 px-3 py-2 rounded-[6px]'>{children}</div>
      </NavigationMenuLink>
   </li>
));

function StyledIndicator(props) {
   return (
      <NavigationMenuPrimitive.Indicator
         className='h-[20px] overflow-hidden z-10 transition'
         {...props}
      />
   )
}

const NavigationMenuIndicator = forwardRef((props, forwardedRef) => (
   <StyledIndicator {...props} ref={forwardedRef}>
      <div className="relative top-[5px]">
         <div
            className={clsx(
               "absolute top-1/2 left-[40px] transform -translate-y-1/2",
               "w-[0px] h-[0px] border-l-[12px] border-l-transparent",
               "border-r-[12px] border-r-transparent",
               "border-b-[12px] border-b-gray-200"
            )}
         ></div>
         <div
            className={clsx(
               "absolute top-[1px] left-[40px] transform -translate-y-1/2",
               "w-[0px] h-[0px] border-l-[12px] border-l-transparent",
               "border-r-[12px] border-r-transparent",
               "border-b-[12px] border-b-white"
            )}
         ></div>
      </div>
   </StyledIndicator>
));

function NavigationMenuViewport(props) {
   return (
      <NavigationMenuPrimitive.Viewport
         className={`
            relative mt-[10px] bg-white rounded-[6px] overflow-hidden shadow-lg border border-gray-200
            h-[var(--radix-navigation-menu-viewport-height)]
         `}
         {...props}
      />
   )
}

function ViewportPosition(props) {
   return (
      <div className='absolute w-full top-[100%] left-0'>
         {props.children}
      </div>
   )
}

function ContentList({ children, className, ...props }) {
   return (
      <ul className={`p-[3px] m-0 mb-px flex flex-col gap-[6px] list-none w-full ${className}`} {...props}>
         {children}
      </ul>
   )
}

export function Navbar() {
   return (
      <div className='flex items-center justify-between'>
         <NavigationMenu>
            <NavigationMenuList className="gap-[45px]" >
               <NavigationMenuItem>
                  <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                  <NavigationMenuContent>
                     <ContentList>
                        <ContentListItem href="#">
                           Product Inspection Management
                        </ContentListItem>
                        <ContentListItem href="#">
                           Work Order Management
                        </ContentListItem>
                        <ContentListItem href="#">
                           Guard Tour Management
                        </ContentListItem>
                        <ContentListItem href="#">
                           Visitor Management
                        </ContentListItem>
                     </ContentList>
                  </NavigationMenuContent>
               </NavigationMenuItem>

               <NavigationMenuItem>
                  <NavigationMenuLink href="#">Pricing</NavigationMenuLink>
               </NavigationMenuItem>

               <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                     <ContentList>
                        <ContentListItem href="#">
                           Support
                        </ContentListItem>
                        <ContentListItem href="#">
                           Blog
                        </ContentListItem>
                        <ContentListItem href="#">
                           Consultancy
                        </ContentListItem>
                     </ContentList>
                  </NavigationMenuContent>
               </NavigationMenuItem>

               <NavigationMenuItem>
                  <NavigationMenuLink href="#">About</NavigationMenuLink>
               </NavigationMenuItem>

               <NavigationMenuItem>
                  <NavigationMenuLink href="#">Contact</NavigationMenuLink>
               </NavigationMenuItem>

               <NavigationMenuIndicator />
            </NavigationMenuList>

            <ViewportPosition>
               <NavigationMenuViewport />
            </ViewportPosition>
         </NavigationMenu>

         <NavigationMenu>
            <NavigationMenuList>
               <NavigationMenuItem>
                  <ButtonLink className="text-blue-custom" href="#">Login</ButtonLink>
               </NavigationMenuItem>

               <NavigationMenuItem>
                  <ButtonLink
                     contained
                     href="#"
                     iconRight={<FaChevronRight className="mt-[2.5px]" size={10} />}
                  >
                     Start for free
                  </ButtonLink>
               </NavigationMenuItem>
            </NavigationMenuList>
         </NavigationMenu>
      </div>
   )
}
