import { Container } from "./Container";
import { TbMenu } from "react-icons/tb";
import { useState } from "react";
import { MobileNavbar } from "./MobileNavbar";
import { GrClose } from "react-icons/gr";

export function MobileHeader() {
   const [isOpen, setIsOpen] = useState(false)

   function toggle() {
      setIsOpen(prev => !prev)
      document.body.classList.toggle('overflow-y-hidden')
   }

   return (
      <>
         <header className="bg-white z-50 relative block lg:hidden">
            <Container>
               <div className="h-[60px] flex items-center justify-between">
                  <img className="max-h-[25px]" src="/inspxt-logo.png" />
                  <button onClick={toggle}>
                     {
                        isOpen
                           ? <GrClose size={25} className="text-black-custom" />
                           : <TbMenu size={35} className="text-black-custom" />
                     }
                  </button>
               </div>
            </Container>
         </header>
         <MobileNavbar isOpen={isOpen} />
      </>
   );
}


