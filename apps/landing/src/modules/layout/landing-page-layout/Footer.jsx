import { Button } from "@/components/ui/Button";
import { Container } from "@/modules/layout/landing-page-layout/Container";
import clsx from "clsx";
import Link from "next/link";
import { groupMenuList } from "./groupMenuList";

export function Footer({ className }) {
   return (
      <footer className={clsx("pt-[5px] md:pt-[60px] mt-[60px]", className)}>
         <Container>
            <div className="flex flex-wrap md:items-start justify-between my-[60px]">
               <div className="md:flex gap-16 w-full lg:w-auto md:justify-between">
                  <div className="flex flex-col items-center md:items-start">
                     <img src="/inspxt-logo.png" />
                     <p className="md:ml-8 mt-4 mb-8 font-semibold">
                        Quality is Our Habit
                     </p>
                     <div className="flex gap-4">
                        <Button
                           outlined
                           className="border-blue-custom text-blue-custom"
                        >
                           Login
                        </Button>
                        <Button
                           outlined
                           className="border-blue-custom text-blue-custom"
                        >
                           Inspector Signup
                        </Button>
                     </div>
                  </div>
                  <div className="mt-[16px] md:mt-0">
                     <h2 className="font-semibold text-[18px] mb-6 hidden md:block">
                        Download
                     </h2>
                     <div className="flex md:flex-col justify-between mt-8 md:mt-0">
                        <img
                           className="md:mb-4"
                           src="/landing-images/app-store.png"
                        />
                        <img src="/landing-images/play-store.png" />
                     </div>
                  </div>
               </div>
               <div className="w-full md:w-auto mt-[30px] md:mt-0">
                  <div className="flex items-center justify-between md:gap-8 mb-3">
                     <input
                        className="border-b-2 py-3 bg-transparent outline-none focus:border-blue-custom"
                        placeholder="Email Address"
                        type="email"
                     />
                     <Button
                        contained
                     >
                        Subscribe
                     </Button>
                  </div>
                  <p>Subscribe to updates</p>
               </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-[40px] mb-[60px]">
               {groupMenuList.map((group) => {
                  return (
                     <div key={group.groupName}>
                        <h2 className="font-bold text-[18px] mb-8">
                           {group.groupName}
                        </h2>
                        <ul>
                           {group.menus.map((menu) => {
                              return (
                                 <li className="mb-4" key={menu.name}>
                                    <Link href={menu.link}>
                                       <a className="hover:text-blue-custom">
                                          {menu.name}
                                       </a>
                                    </Link>
                                 </li>
                              );
                           })}
                        </ul>
                     </div>
                  );
               })}
            </div>
         </Container>
         <div className="bg-blue-custom text-white text-center p-10">
            <p className="font-semibold">
               Copyright ©2022. All Right Reserved - Inspxt.com
            </p>
         </div>
      </footer>
   );
}
