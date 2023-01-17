import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Separator } from "@/components/ui/Separator";
import clsx from "clsx";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

export function ServicePackages({ packages, hasPackage }) {
   const [active, setActive] = useState('basic')

   const activePackage = packages[active]

   return (
      <Card className="p-[30px] mt-[40px] md:mt-[0] overflow-x-auto md:min-w-[386px]">

         {
            hasPackage
               ? (
                  <>
                     <div className="flex gap-[15px]">
                        {
                           Object.values(packages).map(packageGig => {
                              const level = packageGig?.level_package?.toLocaleLowerCase()

                              return packageGig ? (
                                 <Button
                                    className="capitalize"
                                    key={packageGig.id}
                                    outlined={active !== level}
                                    contained={active === level}
                                    onClick={() => setActive(level)}
                                 >
                                    {level}
                                 </Button>
                              ) : null
                           })
                        }
                     </div>
                     <div className="mt-[25px]">
                        <div>
                           <h2 className="text-[28px] font-semibold mb-[10px]">${activePackage?.price_package}</h2>
                           <div className="flex items-center h-[14px] gap-[10px] mb-[24px]">
                              {/* <p>{activePackage?.total_screen}</p> */}
                              {/* <Separator className="w-[1.5px]" orientation="vertical" /> */}
                              <p>{activePackage?.delivery_time?.delivery_time} Days Delivery</p>
                              <Separator className="w-[1.5px]" orientation="vertical" />
                              <p>{activePackage?.revision_package?.revision_limit} Revisions</p>
                           </div>
                           <p className="mb-[40px]">{activePackage?.description}</p>
                           <div className="flex flex-col gap-[9px] mb-[40px]">
                              {
                                 activePackage?.scopes_package_gigs?.map(scope => (
                                    <div key={scope.id} className="flex items-center gap-[12px]">
                                       <div className={clsx(
                                          "h-[15px] w-[15px] rounded-full flex justify-center items-center",
                                          [Number(scope.scope_is_true) ? 'bg-blue-custom' : 'bg-blue-custom/30']
                                       )}>
                                          <FaCheck size={8} className="text-white" />
                                       </div>
                                       <p>{scope.name}</p>
                                    </div>
                                 ))
                              }
                           </div>
                           <Button
                              className="mb-[24px] w-full"
                              contained
                           >
                              Continue (${activePackage?.price_package})
                           </Button>
                           <Button className="w-full" outlined>
                              Request for Quote
                           </Button>
                        </div>
                     </div></>
               )
               : <p>No Package Found!</p>
         }
      </Card>
   );
}
