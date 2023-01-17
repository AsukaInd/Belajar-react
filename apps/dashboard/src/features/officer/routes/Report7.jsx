import React from "react";
import JsPDF from "jspdf";
import Header from "./reportComponent/Header";
import Footer from "./reportComponent/Footer";
import Title from "./reportComponent/Title";
import html2canvas from 'html2canvas'


/* 
* Sample Image
*/
import facilityname from './reportComponent/Assets/facilityname.png'
import inspector from './reportComponent/Assets/inspector.png'
import warehouse from './reportComponent/Assets/warehouse.png'
import cartoon from './reportComponent/Assets/cartoon.png'
import sampling from './reportComponent/Assets/sampling.png'
import inspectionchop from './reportComponent/Assets/inspectionchop.png'
import AttachmentImage from "./reportComponent/AttachmentImage";


{/* <FaRegCheckCircle
   className="text-gray-600 my-auto mx-auto font-bold"
   size={24}
/> */}

function Report7() {
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
         <Title>Photo Attachment</Title>
         <hr />
         <div className="flex gap-1">
            <AttachmentImage src={facilityname} name="Facility Name" />
            <AttachmentImage src={inspector} name="Inspector with the factory QA" />
         </div>
         <hr />
         <div className="flex gap-1">
            <AttachmentImage src={warehouse} name="Warehouse overview" />
            <AttachmentImage src={cartoon} name="Carton stacking" />
         </div>
         <hr />
         <div className="flex gap-1">
            <AttachmentImage src={sampling} name="Sampling cartons" />
            <AttachmentImage src={inspectionchop} name="Inspection Chop on the sampling cartons" />
         </div>
         <Footer />
      </div>
   );
}

export default Report7;
