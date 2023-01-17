import React from "react";

function EmptyData({ onClick }) {
   return (
      <div className="text-center cursor-pointer" onClick={onClick}>
         <img src="/images/empty.png" />
         <div className="text-2xl">Data is Empty, Click to Add Data</div>
      </div>
   );
}

export default EmptyData;
