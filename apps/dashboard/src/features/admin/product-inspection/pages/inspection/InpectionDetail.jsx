import React, { useState } from "react";

import { Checkbox } from "primereact/checkbox";
import { RegularButton } from "../../../../../components/product-inspection/Button";
import BasicInfo from "../../components/inspection/BasicInfo";
function InpectionDetail() {
   const tabs = [
      "Basic Info",
      "Chapters",
      "Quantity Breakdown",
      "Weight Chart",
      "Size Measurement",
      "Workmanship",
   ];
   const [activeTabs, setActiveTabs] = useState(0);
   const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
   return (
      <div className="layout-content">
         <h4>Inspection Detail</h4>
         <div className="flex gap-2">
            {tabs.map((value, index) => (
               <div
                  className={`${
                     activeTabs === index
                        ? "bg-white text-blue-1 border-2"
                        : "bg-blue-1 text-white hover:bg-blue-600"
                  } cursor-pointer p-2 rounded `}
                  key={index}
                  onClick={() => setActiveTabs(index)}
               >
                  {value}
               </div>
            ))}
         </div>
         <div className="my-4" />
         {activeTabs === 0 && (
            <BasicInfo/>
         )}
         {activeTabs === 1 && (
            <section>
               <div className="bg-blue-1 text-white p-2 rounded font-bold">
                  Inspection Chapter
               </div>
               <table>
                  <thead className="w-full">
                     <th className="">Sequence</th>
                     <th className="">Name</th>
                     <th className="">Type</th>
                     <th className="">Instruction</th>
                     <th className="">Is Checked</th>
                     <th className="">Delete?</th>
                  </thead>
                  <tbody>
                     {dummy.map((value, index) => (
                        <tr>
                           <td className="p-2 w-24">
                              <input
                                 value={value}
                                 type="text"
                                 className="p-2 border-gray-300 border-1 rounded-md text-gray-700 w-full"
                              />
                           </td>
                           <td className="p-2">
                              <input
                                 value="lorem ipsum"
                                 type="text"
                                 className="p-2 border-gray-300 border-1 rounded-md text-gray-700 w-full"
                              />
                           </td>
                           <td className="p-2">
                              <select className="p-2 border-gray-300 border-1 bg-white rounded-md text-gray-700 w-full">
                                 <option>Normal</option>
                                 <option>Quantity Breakdown</option>
                                 <option>Weight Chart</option>
                                 <option>Size Measurement</option>
                                 <option>Workmanship</option>
                              </select>
                           </td>
                           <td className="p-2 w-96">
                              Please verify the display information match to the
                              assigned facotry where you will conduct the
                              product inspection. 请检查下列显示的信息，
                              和您被指定所在工厂的验货信息是否相符合。
                           </td>
                           <td className="p-2">
                              <input type="checkbox" />
                           </td>
                           <td className="p-2">
                              <input type="checkbox" />
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </section>
         )}
         {activeTabs === 2 && (
            <section>
               <div className="bg-blue-1 text-white p-2 rounded font-bold">
                  Inspection Quantity
               </div>
               <table>
                  <thead className="w-full">
                     <th>Product Size</th>
                     <th>PO Quantity</th>
                     <th>Shipment Quantity</th>
                     <th>Pieces in each Box</th>
                     <th>Box Quantity</th>
                     <th>Pieces in Mantissa Box</th>
                     <th>Box Numbers</th>
                     <th>Sample Box Numbers</th>
                     <th>Sample Size</th>
                     <th>Delete?</th>
                  </thead>
                  <tbody>
                     {dummy.map((value, index) => (
                        <tr>
                           <td className="p-2 w-32">
                              <select className="p-2 border-gray-300 border-1 bg-white rounded-md text-gray-700 w-full">
                                 <option>XL</option>
                                 <option>L</option>
                                 <option>M</option>
                                 <option>S</option>
                                 <option>XS</option>
                              </select>
                           </td>
                           <td className="p-2">
                              <input
                                 value="99"
                                 type="text"
                                 className="p-2 border-gray-300 border-1 rounded-md text-gray-700 w-full"
                              />
                           </td>
                           <td className="p-2"></td>
                           <td className="p-2"></td>
                           <td className="p-2"></td>
                           <td className="p-2"></td>
                           <td className="p-2"></td>
                           <td className="p-2 w-96"></td>
                           <td className="p-2"></td>
                           <td className="p-2">
                              <input type="checkbox" />
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </section>
         )}
         {activeTabs === 3 && (
            <section>
               <div className="bg-blue-1 text-white p-2 rounded font-bold">
                  Weight Chart
               </div>

               <table>
                  <thead className="w-full">
                     <th className="">Sequence</th>
                     <th className="">Product Size</th>
                     <th className="">SKU / Style / Color</th>
                     <th className="">Required Value</th>
                     <th className="">Actual Weight 1</th>
                     <th className="">Actual Weight 2</th>
                     <th className="">Delete?</th>
                  </thead>
                  <tbody>
                     {dummy.map((value, index) => (
                        <tr>
                           <td className="p-2 w-24">
                              <input
                                 value={value}
                                 type="text"
                                 className="p-2 border-gray-300 border-1 rounded-md text-gray-700 w-full"
                              />
                           </td>
                           <td className="p-2">
                              <select className="p-2 border-gray-300 border-1 bg-white rounded-md text-gray-700 w-full">
                                 <option>XL</option>
                                 <option>L</option>
                                 <option>M</option>
                                 <option>S</option>
                                 <option>XS</option>
                              </select>
                           </td>
                           <td className="p-2 w-96">
                              <input
                                 value="red"
                                 type="text"
                                 className="p-2 border-gray-300 border-1 rounded-md text-gray-700 w-full"
                              />
                           </td>
                           <td className="p-2">
                              <input
                                 value="100.0"
                                 type="text"
                                 className="p-2 border-gray-300 border-1 rounded-md text-gray-700 w-full"
                              />
                           </td>
                           <td className="p-2">33.00</td>
                           <td className="p-2">44.00</td>
                           <td className="p-2">
                              <input type="checkbox" />
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </section>
         )}
         {activeTabs === 4 && (
            <section>
               <div className="bg-blue-1 text-white p-2 rounded font-bold">
                  Size Measurement
               </div>

               <table>
                  <thead className="w-full">
                     <th className="">Sequence</th>
                     <th className="">Product Size</th>
                     <th className="">Point of Measurement</th>
                     <th className="">Required Value</th>
                     <th className="">Tolerance(+)</th>
                     <th className="">Tolerance(-)</th>
                     <th className="">Actual Value1</th>
                     <th className="">Actual Value2</th>
                     <th className="">Actual Value3</th>
                     <th className="">Delete?</th>
                  </thead>
                  <tbody>
                     {dummy.map((value, index) => (
                        <tr>
                           <td className="p-2 w-24">
                              <input
                                 value={value}
                                 type="text"
                                 className="p-2 border-gray-300 border-1 rounded-md text-gray-700 w-full"
                              />
                           </td>
                           <td className="p-2">
                              <select className="p-2 border-gray-300 border-1 bg-white rounded-md text-gray-700 w-full">
                                 <option>XL</option>
                                 <option>L</option>
                                 <option>M</option>
                                 <option>S</option>
                                 <option>XS</option>
                              </select>
                           </td>
                           <td className="p-2 w-96">
                              <select className="p-2 border-gray-300 border-1 bg-white rounded-md text-gray-700 w-full">
                                 <option>Lorem</option>
                                 <option>Ipsum</option>
                              </select>
                           </td>
                           <td className="p-2">
                              <input
                                 value="100.0"
                                 type="text"
                                 className="p-2 border-gray-300 border-1 rounded-md text-gray-700 w-full"
                              />
                           </td>
                           <td className="p-2">
                              <input
                                 value="1.00"
                                 type="text"
                                 className="p-2 border-gray-300 border-1 rounded-md text-gray-700 w-full"
                              />
                           </td>
                           <td className="p-2">
                              <input
                                 value="-1.00"
                                 type="text"
                                 className="p-2 border-gray-300 border-1 rounded-md text-gray-700 w-full"
                              />
                           </td>
                           <td className="p-2">143.00</td>
                           <td className="p-2">-</td>
                           <td className="p-2">-</td>
                           <td className="p-2">
                              <input type="checkbox" />
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </section>
         )}
         {activeTabs === 5 && (
            <section>
               <div className="bg-blue-1 text-white p-2 rounded font-bold">
                  Workmanship
               </div>
               <main>
                  <div
                     style={{ borderBottom: "0.5px #e5e5e5 solid" }}
                     className="flex w-full border-red-600 p-3"
                  >
                     <div className="w-56 font-bold my-auto">
                        Workmanship Sampe Size
                     </div>
                     <div>
                        <input
                           type="8"
                           className="p-2 border-gray-300 border-1 rounded-md text-gray-700 w-full"
                        />
                     </div>
                  </div>
                  <div
                     style={{ borderBottom: "0.5px #e5e5e5 solid" }}
                     className="flex w-full border-red-600 p-3"
                  >
                     <div className="w-56 font-bold my-auto">
                        Workmanship Sample
                     </div>
                     <div>
                        <select className="p-2 border-gray-300 border-1 bg-white rounded-md text-gray-700 w-full">
                           <option>Workmanship for textile</option>
                        </select>
                     </div>
                  </div>
               </main>
               <table>
                  <thead className="w-full">
                     <th className="">Number</th>
                     <th className="pl-48">Delete?</th>
                  </thead>
                  <tbody>
                     {dummy.map((value, index) => (
                        <tr className="">
                           <td className="p-2 w-24">
                              <input
                                 value={value}
                                 type="text"
                                 className="p-2 border-gray-300 border-1 rounded-md text-gray-700 w-full"
                              />
                           </td>
                           <td className="pl-48">
                              <input type="checkbox" />
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </section>
         )}
         
         <div className="flex flex-row-reverse mt-4">
            <RegularButton title="Next" />
         </div>
      </div>
   );
}

export default InpectionDetail;
