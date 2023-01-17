import React from "react";
import JsPDF from "jspdf";
import Header from "./reportComponent/Header";
import Footer from "./reportComponent/Footer";
import Title from "./reportComponent/Title";

/* 
* Sample Image
*/
import Card from "./reportComponent/Card";
import html2canvas from 'html2canvas'

/* 
* Datas
*/
import { initial_data, initial_data2, initial_data3, initial_data4, initial_weight, initial_weight2, initial_weight3, initial_weight4 } from "./reportComponent/JSON/measureData";
import CardWeight from "./reportComponent/CardWeight";

{/* <FaRegCheckCircle
   className="text-gray-600 my-auto mx-auto font-bold"
   size={24}
/> */}

function Report6() {
   // const generatePDF = () => {
   //    const report = new JsPDF({
   //       orientation: 'p',
   //       unit: 'mm',
   //       format: 'a4',
   //       putOnlyUsedFonts: true
   //    });
   //    report.html(document.querySelector("#report")).then(() => {
   //       report.save("report.pdf");
   //    });
   // };

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

   return (
            <div id="report" className="m-2">
               <Header />
               <div className="px-4">
                  <Title>SIZE MEASUREMENT</Title>
                  <div className="flex text-[10px]">
                     <Card data={initial_data} />
                     <Card data={initial_data2} withoutName />
                     <Card data={initial_data3} withoutName />
                     <Card data={initial_data4} withoutName />
                  </div>
                  <div className="flex">
                     <Card data={initial_data} />
                     <Card data={initial_data2} withoutName />
                     <Card data={initial_data3} withoutName />
                     <Card data={initial_data4} withoutName />
                  </div>
                  <Title>WEIGHT CHART</Title>
                  <div className="flex flex-grow">
                     <CardWeight data={initial_weight} />
                     <CardWeight data={initial_weight2} />
                     <CardWeight data={initial_weight3} />
                     <CardWeight data={initial_weight4} />
                  </div>
                  <div className="flex flex-grow">
                     <CardWeight data={initial_weight} />
                     <CardWeight data={initial_weight2} />
                     <CardWeight data={initial_weight3} />
                     <CardWeight data={initial_weight4} />
                  </div>
               </div>
               <Footer />
            </div>
   );
}

export default Report6;
