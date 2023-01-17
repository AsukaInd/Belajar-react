import React, { useEffect } from "react";
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
import Report4 from "./Report4";
import Report5 from "./Report5";
import Report6 from "./Report6";
import Report7 from "./Report7";


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

function Report() {
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
      <div className="max-w-3xl mx-auto min-h-screen border-1">
         <div className="w-full">
            <div className="flex gap-4 justify-center border-b-1 mx-2">
               <div className="my-auto">
                  <span className="text-white bg-[#ff0000] my-auto px-3 py-2 py-auto font-bold">
                     2
                  </span>
               </div>
               <h1 className="text-2xl bg-[#ffff00]">
                  Display of SOP Audit info page with signature on Report
               </h1>
               <div
                  onClick={generatePDF}
                  type="button"
                  className="bg-blue-2 text-white font-medium rounded border-r-0 px-3 py-2 my-auto cursor-pointer"
               >
                  Download
               </div>
            </div>

            {/* Report */}
            <div id="report" className="m-2">
               <Header />
               <div className="">
                  <Title>Inspection Information</Title>
                  <div className="flex mx-4">
                     <div className="flex-1 w-3/5">
                        {generateInformation(inspection_information)}
                     </div>
                     <div className="flex-none w-2/5 p-4">
                        <img src={sample} alt="sample image" className="w-full" />
                     </div>
                  </div>
                  <Title>Inspection Standards</Title>
                  <div className="w-full px-4">
                     {generateInformation(inspection_standards)}
                  </div>
                  <Title>Inspection Summary</Title>
                  <div className="w-full px-4">
                     <div className="flex text-sm font-semibold" style={{ border: "solid grey", borderWidth: "0px 0px 1px 0px" }}>
                        <div className="w-[200px]">Sections</div>
                        <div className="flex-1 flex justify-between text-center">
                           <div className="text-center">Pass</div>
                           <div className="text-center">Fail</div>
                           <div className="text-center">Pending</div>
                           <div className="w-1/3 text-center">Remark</div>
                        </div>
                     </div>
                     {generateSummary(inspection_summary)}
                  </div>
                  <div className="w-full mt-4">
                     <div className="flex px-4 font-semibold text-xl items-center">
                        <div className="w-1/3">Conclusion</div>
                        <div className="py-2 px-4 border-2 border-green-400 rounded-md text-green-400">PASS</div>
                     </div>
                  </div>
               </div>
               <Footer />
            </div>
            <div className="my-4">
               <hr />
            </div>
            <Report4 />
            <div className="my-4">
               <hr />
            </div>
            <Report5 />
            <div className="my-4">
               <hr />
            </div>
            <Report6 />
            <div className="my-4">
               <hr />
            </div>
            <Report7 />
         </div>
      </div>
   );
}

export default Report;
