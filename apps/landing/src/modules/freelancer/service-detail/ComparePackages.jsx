import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import clsx from "clsx";
import { FiCheck } from "react-icons/fi";
import { RadioGroup, RadioGroupRadio, RadioGroupIndicator } from "@/components/ui/RadioGroup";

export function ComparePackages({ packages, hasPackage }) {
   return (
      <div id="Compare Packages">
         <h1 className="text-[30px] font-bold mb-[34px]">Compare Packages</h1>
         <Card className="overflow-x-auto py-[40px]">
            {
               hasPackage
                  ? <PackageTable packages={packages} />
                  : <p className="px-[40px]">No Package Found!</p>
            }
         </Card>
      </div>
   )
}

function PackageTable({ packages }) {
   const packagesLength = Object.values(packages).filter(item => item !== undefined)?.length

   return (
      <table className="w-full">
         <tbody>
            <tr>
               <th className="flex mt-[5px] font-normal pl-[40px] px-[20px] py-[10px] text-left">
                  Packages
               </th>
               {
                  Object.values(packages).map((item, index) => {
                     return item ? (
                        <td
                           className={clsx(
                              "px-[20px] py-[14px]",
                              { "text-center": packagesLength === 1 }
                           )}
                           key={index}
                        >
                           <p className="text-[24px] font-semibold">${item?.price_package}</p>
                           <p className="text-blue-custom mb-[14px] capitalize">{item?.level_package}</p>
                           <p className="mb-[40px]">{item?.total_screen}</p>
                           <p>{item?.description}</p>
                        </td>
                     ) : null
                  })
               }
            </tr>
            <TableDataCheckIcon
               className="bg-[#005AA605]"
               thName="Source File"
               packages={packages}
               scopeID="1"
            />
            <TableDataCheckIcon
               thName="Sourcing Strategy"
               packages={packages}
               scopeID="2"
            />
            <TableDataCheckIcon
               className="bg-[#005AA605]"
               thName="Budget Analysis"
               packages={packages}
               scopeID="3"
            />
            <TableDataCheckIcon
               thName="Commercial Use"
               packages={packages}
               scopeID="4"
            />
            <tr>
               <th className="flex mt-[5px] font-normal pl-[40px] px-[20px] py-[10px] text-left">
                  Delivery Time
               </th>
               {
                  Object.values(packages).map((item, index) => {
                     const deliveryTime = item?.delivery_time?.delivery_time

                     return item ? (
                        <td key={index}>
                           <div
                              className="flex items-center justify-center"
                           >
                              <RadioGroup>
                                 <div
                                    className="flex items-center mb-[14px] gap-[10px]"
                                 >
                                    <RadioGroupRadio
                                       value={deliveryTime}
                                       id={`${deliveryTime}-${index}`}>
                                       <RadioGroupIndicator />
                                    </RadioGroupRadio>
                                    <label
                                       htmlFor={`${deliveryTime}-${index}`}
                                    >
                                       {deliveryTime} Days
                                    </label>
                                 </div>
                              </RadioGroup>
                           </div>
                        </td>
                     ) : null
                  })
               }
            </tr>
            <tr className="bg-[#005AA605]">
               <th className="flex mt-[5px] pl-[40px] font-normal px-[20px] py-[10px] text-left">
                  Total
               </th>
               {
                  Object.values(packages).map((item, index) => {
                     return item ? (
                        <td key={index}>
                           <div className="flex items-center justify-center">
                              <p className="text-[24px] font-semibold">${item?.price_package}</p>
                           </div>
                        </td>
                     ) : null
                  })
               }
            </tr>
            <tr>
               <th></th>
               {
                  Object.values(packages).map((item, index) => {
                     return item ? (
                        <td key={index}>
                           <div className="pt-[20px] flex justify-center">
                              <Button contained>Select</Button>
                           </div>
                        </td>
                     ) : null
                  })
               }
            </tr>
         </tbody>
      </table>
   )
}

function TableDataCheckIcon({ thName, packages, scopeID, className }) {
   return (
      <tr className={className}>
         <th className="flex font-normal pl-[40px] px-[20px] py-[10px] text-left">{thName}</th>
         {
            Object.values(packages).map((item, index) => {
               if (!item) return null

               const scope = item?.scopes_package_gigs?.find(scope => scope.scope_id === scopeID)

               return (
                  <td className="px-[20px] py-[10px]" key={index}>
                     <div className="flex justify-center items-center">
                        <FiCheck
                           className={clsx(
                              [
                                 Number(scope?.scope_is_true)
                                    ? "text-blue-custom"
                                    : "text-blue-custom/30"
                              ]
                           )}
                           size={24}
                        />
                     </div>
                  </td>
               )
            })
         }
      </tr>
   )
}