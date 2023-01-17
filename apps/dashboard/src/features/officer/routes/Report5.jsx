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



{/* <FaRegCheckCircle
   className="text-gray-600 my-auto mx-auto font-bold"
   size={24}
/> */}

function Report5() {
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
      <div id="report" className="m-2" >
         <Header />
         <div className="">
            <Title>PACKAGING & OTHERS</Title>
            <div className="flex px-4 flex-col">
               <div className="grid grid-cols-3 grid-rows-5 divide-y divide-slate-400 leading-6 w-full text-xs" style={{ borderTop: '1px solid rgb(148,163,184)', borderBottom: '1px solid rgb(148,163,184)' }}>
                  <div className="col-span-3 text-semibold text-center h-6 leading-6 font-semibold" >Cardboard weight and thickness, securing tape width:</div>
                  <div className="font-semibold text-center">Item</div>
                  <div className="font-semibold text-center">Specification</div>
                  <div className="font-semibold text-center">Actual</div>
                  <div className="">Cardboard weight</div>
                  <div className="text-center">Min 650 gsm</div>
                  <div className="text-center">1464 gsm</div>
                  <div>Cardboard thickness</div>
                  <div className="text-center">7 mm (+/- 1 mm)</div>
                  <div className="text-center">7mm</div>
                  <div>Tape width</div>
                  <div className="text-center">2 cm (+1 cm and -0.5 cm)</div>
                  <div className="text-center">1.5 cm</div>
               </div>
               <div className="my-4"></div>
               <div className="grid grid-cols-5 text-center grid-rows-3 divide-y divide-slate-400 leading-6 w-full text-xs" style={{ borderTop: '1px solid rgb(148,163,184)', borderBottom: '1px solid rgb(148,163,184)' }}>
                  <div className="row-span-2 font-semibold text-sm leading-10">Item</div>
                  <div className="col-span-2 font-semibold" style={{ borderTop: "0px" }}>Dimension of Carton</div>
                  <div className="col-span-2 font-semibold" style={{ borderTop: "0px" }}>Weight of carton</div>
                  <div className="font-semibold">Specification</div>
                  <div className="font-semibold">Actual</div>
                  <div className="font-semibold"> Specification</div>
                  <div className="font-semibold">Actual</div>
                  <div></div>
                  <div>40x60x45(1.42 sm)</div>
                  <div>40x59x45</div>
                  <div>≤ 30 kg</div>
                  <div>14.1kg</div>
               </div>
               <div className="my-4"></div>
               <div className="grid grid-cols-4 grid-rows-6 divide-y divide-slate-400 leading-6 w-full text-xs" style={{ borderTop: '1px solid rgb(148,163,184)', borderBottom: '1px solid rgb(148,163,184)' }}>
                  <div className="col-span-4 font-semibold">Humidity and temperature check</div>
                  <div className="font-semibold text-center">Location</div>
                  <div className="font-semibold text-center">Time</div>
                  <div className="font-semibold text-center">Temperature</div>
                  <div className="font-semibold text-center">Humidity</div>
                  <div>Finished goods</div>
                  <div className="text-center">1 :30pm</div>
                  <div className="text-center">13℃</div>
                  <div className="text-center">62%</div>
                  <div>Warehouse</div>
                  <div className="text-center">5 :15pm</div>
                  <div className="text-center">17℃</div>
                  <div className="text-center">58%</div>
                  <div>Export carton</div>
                  <div className="text-center">-</div>
                  <div className="text-center">-</div>
                  <div className="text-center">-</div>
                  <div className="col-span-4">Accepted standard : Temperature : 0-20℃ Humidity: 0-70%</div>
               </div>
               <div className="my-4"></div>
               <div className="grid grid-cols-7 grid-rows-4 divide-y divide-slate-400 leading-6 w-full text-xs" style={{ borderTop: '1px solid rgb(148,163,184)', borderBottom: '1px solid rgb(148,163,184)' }}>
                  <div className="col-span-7">Model: Barcode readability check on: carton, hangtag, polybag</div>
                  <div className="text-center font-semibold row-span-2 leading-10">COLOR</div>
                  <div className="text-center font-semibold row-span-2 leading-10">SIZE</div>
                  <div className="text-center font-semibold row-span-2 leading-10">EAN CODE REQ</div>
                  <div className="text-center font-semibold col-span-4">ACTUAL FINDING</div>
                  <div className="font-bold text-center">Carton</div>
                  <div className="font-bold text-center">Hangtag</div>
                  <div className="font-bold text-center">Polybag</div>
                  <div className="font-bold text-center">RESULT</div>
                  <div>Red</div>
                  <div className="text-center">X</div>
                  <div className="text-center">89350049518</div>
                  <div className="text-center">89350049518</div>
                  <div className="text-center">89350049518</div>
                  <div className="text-center">89350049518</div>
                  <div>.</div>
                  <div className="col-span-7">NOTE:</div>
               </div>
            </div>
            <div className="my-4 px-4 text-xs font-semibold">
               <div className="flex flex-cols">
                  <div className="w-1/2">
                     <div>Inspector: Benjamin Wang</div>
                     <div>Signed by</div>
                     <img src="" alt="" className="mt-8" />
                     <div>July 28, 2021</div>
                  </div>
                  <div className="w-1/2">
                     <div>Supervisor: James Wilson</div>
                     <div>Signed by</div>
                     <img src="" alt="" className="mt-8" />
                     <div>July 28, 2021</div>
                  </div>
               </div>
            </div>
         </div>
         <Footer />
      </div >
   );
}

export default Report5;
