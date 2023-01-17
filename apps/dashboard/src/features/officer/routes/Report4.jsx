import React from "react";
import JsPDF from "jspdf";
import Header from "./reportComponent/Header";
import Footer from "./reportComponent/Footer";
import Title from "./reportComponent/Title";
import html2canvas from 'html2canvas'


/* 
* Sample Image
*/
import sample from './reportComponent/sample.png'
import SliceInfo from "./reportComponent/SliceInfo";
import SliceValue from "./reportComponent/SliceValue";

/* 
* Datas
*/
const inspection_information = [
   { name: "Client", value: "ETOS SA" },
   { name: "Supplier", value: "High-Q Industrial(Group) Limited" },
   { name: "Factory", value: "YingKouHongYuan Garment Factory" },
   { name: "Product", value: "Maroon Men’s VEST" },
   { name: "Model No.", value: "EXECT" },
   { name: "Color and Size", value: "Navy, Maroon, S, M, L, XL, XXL" },
   { name: "PO. No.", value: "4520006111" },
   { name: "PO. Quantity", value: "3820" },
   { name: "Shipment Quantity", value: "3837" },
   { name: "Inspection Date", value: "2022-05-06" },
   { name: "Inspection Location", value: "YingKouHongYuan Garment Factory Changzheng Road yong an home outside, Gaizhou City Liaoning Province" },
]

const inspection_standards = [
   { name: "Inspection Type", value: "Pre-shipment Inspection" },
   { name: "Sampling Standard", value: "ISO 2859" },
   { name: "General Inpection Level", value: "Level II/III" },
   { name: "AQL for Critical/Major, Minor Defect", value: "0/ 2.5/ 4" },
   { name: "Sample Size", value: "200 Pieces" },
]

const inspection_summary = [
   { name: "Inspection Standard", status: "pass", remarks: "" },
   { name: "Storage Conditions", status: "pass", remarks: "" },
   { name: "Quantity Breakdown and Sample", status: "pass", remarks: "" },
   { name: "Storage Conditions", status: "fail", remarks: "" },
   { name: "Barcode Readability Check", status: "fail", remarks: "" },
   { name: "Packing", status: "pass", remarks: "" },
   { name: "On-Site Testing", status: "pass", remarks: "" },
   { name: "Workmanship", status: "fail", remarks: "" },
   { name: "Size Measurement", status: "pass", remarks: "" },
   { name: "Weight", status: "pending", remarks: "The weight of polyester fiber filling are not even among S to XXL sizes" },
]

{/* <FaRegCheckCircle
   className="text-gray-600 my-auto mx-auto font-bold"
   size={24}
/> */}

function Report4() {
   const generatePDF = () => {
      window.scrollTo(0, 0);
      html2canvas(document.querySelector('#report'), { dpi: 144, scale: 4 })
         .then(function (canvas) {
            const myimage = canvas.toDataURL("image/jpeg");


            const doc = new JsPDF({
               orientation: 'p',
               unit: 'mm',
               format: 'a4',
               putOnlyUsedFonts: true
            })
            const width = doc.internal.pageSize.getWidth();
            const height = doc.internal.pageSize.getHeight();
            doc.addImage(myimage, 'JPEG', 0, 0, width, height);
            doc.save('Report.pdf');
         })
   }

   const generateInformation = (data) => {
      const list = data.map((data) => {
         return <SliceInfo name={data.name} value={data.value} />
      })
      return list
   }

   const generateSummary = (summary) => {
      const list = summary.map((list) => (
         <SliceValue name={list.name} status={list.status} remarks={list.remarks} />
      ))
      return list
   }

   return (
      <div id="report" className="m-2">
         <Header />
         <div className="">
            <Title>REMARKS</Title>
            <div className="px-4">
               <ol className="text-sm list-decimal pl-4">
                  <li className="pl-2">Approval samples were provided by factory during inspection.</li>
                  <li className="pl-2">No warning text was found on the inner poly-bag.</li>
                  <li className="pl-2">For shower curtain (solid), actual fabric weight was 80-83 GSM instead of 70 GSM stated on the specification sheet (+14.3%-+18.6%).
                     For shower curtain (jacquard part), actual fabric weight was 133-136 GSM instead of 125 GSM stated on specification sheet (+6.4%-+8.8%).</li>
               </ol>
            </div>
            <Title>QUANTITY</Title>
            <div className="px-4 text-xs">
               <div className="grid grid-cols-8 my-0 grid text-center font-medium" style={{ border: "1px solid grey", borderWidth: "1px 0px" }}>
                  <div>P.O. No.</div>
                  <div>Item/Style/ Product No./ SKU</div>
                  <div>Order Quantity</div>
                  <div>Shipment Quantity</div>
                  <div>Presented Quantity for Inspection</div>
                  <div >Units Packed in Cartons</div>
                  <div >Units Finished Not Packed</div>
                  <div >Units Not Finished</div>
                  <div className="col-start-3 underline h-4">Units</div>
                  <div className="flex underline-offset-1 h-4">
                     <div className="w-1/2 text-center underline">Units</div>
                     <div className="w-1/2 text-center underline">Ctns</div>
                  </div>
                  <div className="col-start-6 flex underline-offset-1  h-4">
                     <div className="w-1/2 text-center underline">Qty</div>
                     <div className="w-1/2 text-center underline">%</div>
                  </div>
                  <div className="flex underline-offset-1  h-4">
                     <div className="w-1/2 text-center underline">Qty</div>
                     <div className="w-1/2 text-center underline">%</div>
                  </div>
                  <div className="flex underline-offset-1  h-4">
                     <div className="w-1/2 text-center underline">Qty</div>
                     <div className="w-1/2 text-center underline">%</div>
                  </div>
               </div>
               <div className="grid grid-cols-8 my-0 py-1" style={{ border: "1px solid grey", borderWidth: "0px 0px 1px" }}>
                  <div className="">35460677</div>
                  <div className="text-center">2800098</div>
                  <div className="text-center h-4">2874</div>
                  <div className="flex h-4">
                     <div className="w-1/2 text-center">2874</div>
                     <div className="w-1/2 text-center">479</div>
                  </div>
                  <div className="text-center">2874</div>
                  <div className="flex h-4">
                     <div className="w-1/2 text-center">2874</div>
                     <div className="w-1/2 text-center">100</div>
                  </div>
                  <div className="flex  h-4">
                     <div className="w-1/2 text-center">0</div>
                     <div className="w-1/2 text-center">0</div>
                  </div>
                  <div className="flex  h-4">
                     <div className="w-1/2 text-center">0</div>
                     <div className="w-1/2 text-center">0</div>
                  </div>
               </div>
               <div className="grid grid-cols-8 my-0 py-1" style={{ border: "1px solid grey", borderWidth: "0px 0px 1px" }}>
                  <div className="">35460677</div>
                  <div className="text-center">2800098</div>
                  <div className="text-center h-4">2874</div>
                  <div className="flex h-4">
                     <div className="w-1/2 text-center">2874</div>
                     <div className="w-1/2 text-center">479</div>
                  </div>
                  <div className="text-center">2874</div>
                  <div className="flex h-4">
                     <div className="w-1/2 text-center">2874</div>
                     <div className="w-1/2 text-center">100</div>
                  </div>
                  <div className="flex  h-4">
                     <div className="w-1/2 text-center">0</div>
                     <div className="w-1/2 text-center">0</div>
                  </div>
                  <div className="flex  h-4">
                     <div className="w-1/2 text-center">0</div>
                     <div className="w-1/2 text-center">0</div>
                  </div>
               </div>
               <div className="grid grid-cols-8 my-0 py-1" style={{ border: "1px solid grey", borderWidth: "0px 0px 1px" }}>
                  <div className="font-bold">Total</div>
                  <div className="text-center"></div>
                  <div className="text-center h-4">2874</div>
                  <div className="flex h-4">
                     <div className="w-1/2 text-center">2874</div>
                     <div className="w-1/2 text-center">479</div>
                  </div>
                  <div className="text-center">2874</div>
                  <div className="flex h-4">
                     <div className="w-1/2 text-center">2874</div>
                     <div className="w-1/2 text-center">100</div>
                  </div>
                  <div className="flex  h-4">
                     <div className="w-1/2 text-center">0</div>
                     <div className="w-1/2 text-center">0</div>
                  </div>
                  <div className="flex  h-4">
                     <div className="w-1/2 text-center">0</div>
                     <div className="w-1/2 text-center">0</div>
                  </div>
               </div>
               <div className="grid grid-cols-7 my-0 py-1" style={{ border: "1px solid grey", borderWidth: "0px 0px 1px" }}>
                  <div className="col-span-2">List of Export Carton Numbers Opened</div>
                  <div className="col-span-5">
                     <div>Carton No.:</div>
                     <div>2, 13, 27, 33, 45, 66, 72, 89, 113, 165, 168, 177, 186, 190, 193, 194, 198, 203, 251, 338, 469, 473</div>
                  </div>
               </div>
            </div>
            <Title>WORKMANSHIP</Title>
            <div className="px-4 text-xs mb-8">
               <div className="grid grid-cols-5 grid-rows-13 divide-y divide-slate-500" style={{ border: "1px solid rgb(100,116,139)", borderWidth: "1px 0px 1px 0px" }}>
                  <div className="text-center font-semibold h-6 leading-6" style={{ border: "1px solid rgb(100,116,139)", borderWidth: "1px 0px 0px 0px" }}>Result</div>
                  <div></div>
                  <div className="text-center font-semibold h-6 leading-6">AQL</div>
                  <div className="text-center font-semibold h-6 leading-6">Accepted</div>
                  <div className="text-center font-semibold h-6 leading-6">Total Fund</div>
                  <div className="row-span-3 font-bold text-center text-2xl text-emerald-400 leading-loose">PASS</div>
                  <div className="text-right font-semibold">Critical :</div>
                  <div className="text-center">Not allowed</div>
                  <div className="text-center">0</div>
                  <div className="text-center">0</div>
                  <div className="text-right font-semibold">Major :</div>
                  <div className="text-center">2.5</div>
                  <div className="text-center">10</div>
                  <div className="text-center">6</div>
                  <div className="text-right font-semibold">Minor :</div>
                  <div className="text-center">4.0</div>
                  <div className="text-center">14</div>
                  <div className="text-center">3</div>
                  <div className="col-span-5 text-center font-bold h-6 leading-6">DETAILS</div>
                  <div className="col-span-2 font-semibold h-6 leading-6">Defect Description</div>
                  <div className="text-center font-semibold h-6 leading-6">Critical</div>
                  <div className="text-center font-semibold h-6 leading-6">Major </div>
                  <div className="text-center font-semibold h-6 leading-6">Minor</div>
                  <div className="col-span-2">Dirty mark at front panel(4x3-6x6cm)</div>
                  <div className="text-center">0</div>
                  <div className="text-center">2 </div>
                  <div className="text-center"></div>
                  <div className="col-span-2">Hole at surface(0.2x0.3cm)</div>
                  <div className="text-center">0</div>
                  <div className="text-center">1 </div>
                  <div className="text-center"></div>
                  <div className="col-span-2">Open seam at edge(1.5cm)</div>
                  <div className="text-center">0</div>
                  <div className="text-center">3 </div>
                  <div className="text-center"></div>
                  <div className="col-span-2">Untrimmed thread end at edge(1.5-2cm)</div>
                  <div className="text-center">0</div>
                  <div className="text-center"></div>
                  <div className="text-center">3</div>
                  <div className="text-center">&nbsp;</div>
                  <div className="text-right font-semibold h-6 leading-6">Total Funds :</div>
                  <div className="text-center h-6 leading-6">0</div>
                  <div className="text-center h-6 leading-6">6</div>
                  <div className="text-center h-6 leading-6">3</div>
                  <div className="text-center h-6 leading-6">&nbsp;</div>
                  <div className="text-right font-semibold h-6 leading-6">Allowed :</div>
                  <div className="text-center h-6 leading-6">0</div>
                  <div className="text-center h-6 leading-6">6</div>
                  <div className="text-center h-6 leading-6">3</div>
                  <div className="text-center h-6 leading-6">&nbsp;</div>
                  <div className="text-right font-semibold h-6 leading-6">Sample Size :</div>
                  <div className="col-span-3 text-center h-6 leading-6">200</div>
               </div>
            </div>
         </div>
         <Footer />
      </div>
   );
}

export default Report4;
