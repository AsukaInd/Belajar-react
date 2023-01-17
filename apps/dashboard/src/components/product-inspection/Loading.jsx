import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";

function Loading() {
   return (
      <div className="flex">
         <ProgressSpinner className="mx-auto" />
      </div>
   );
}

export default Loading;
