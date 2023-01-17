import { Link } from "react-router-dom";

export default function Home() {
   return (
      <div className="pages-body flex flex-column">
         <div className="align-self-center mt-auto mb-auto">
            <div className="pages-panel flex flex-column gap-4">
               <Link to="/facility-management" className="p-button text-center">
                  main site
               </Link>
               <Link to="/officer" className="p-button">
                  officer portal
               </Link>
               <Link to="/freelancer" className="p-button mt-4">
                  freelancer
               </Link>
               <Link to="/admin/product-inspection" className="p-button">
                  Admin
               </Link>
            </div>
         </div>
      </div>
   );
}
