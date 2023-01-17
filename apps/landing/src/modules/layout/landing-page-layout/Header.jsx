import { Container } from "./Container";
import { Button } from "@/components/ui/Button";
import { IconGlobeAlt } from "@/components/icons/IconGlobeAlt";
import { FaChevronDown } from "react-icons/fa";
import { Navbar } from "./Navbar";
import Link from "next/link";

export function Header() {
   return (
      <>
         <header className="bg-white shadow-header hidden lg:block">
            <Container>
               <div className="h-[80px] flex items-center justify-between">
                  <img className="hidden lg:block max-h-[35px]" src="/inspxt-logo.png" />
                  <div className="flex items-center w-full lg:w-auto justify-between gap-[40px]">
                     <Link href="#">
                        <a className="text-blue-custom font-[600]">
                           Hire Inspector
                        </a>
                     </Link>
                     <Button
                        iconLeft={<IconGlobeAlt />}
                        iconRight={<FaChevronDown />}
                     >
                        EN
                     </Button>
                  </div>
               </div>
            </Container>
            <div className="border-b border-[#F0F0F0]"></div>
            <div className="hidden lg:block">
               <Container className="py-[18px]">
                  <Navbar />
               </Container>
            </div>
         </header>
      </>
   );
}
