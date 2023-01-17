export function Earnings() {
   return (
      <div className="mb-4">
         <h3>Earnings</h3>
         <div
            className="flex justify-content-between flex-wrap text-white"
            style={{ gap: "2rem" }}
         >
            <div className="text-center flex-1 p-6 card mb-0 bg-primary">
               <h4>4565</h4>
               <b>Net income</b>
            </div>
            <div className="text-center flex-1 p-6 card mb-0 bg-primary">
               <h4>$8451</h4>
               <b>Withdrawn</b>
            </div>
            <div className="text-center flex-1 p-6 card mb-0 bg-primary">
               <h4>4565</h4>
               <b>Pending clearance</b>
            </div>
            <div className="text-center flex-1 p-6 card mb-0 bg-primary">
               <h4>99%</h4>
               <b>Avaliable</b>
            </div>
         </div>
      </div>
   );
}
