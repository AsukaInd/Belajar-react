import { useEffect } from "react";
import apiCountry from "../api/teritory/apiCountry";
import { useAuth } from "~/features/auth/useAuth";

export default function Dashboard() {
   const { logout } = useAuth();
   // useEffect(() => {
   //    const check = async () => {
   //       console.log("checking");
   //       await apiCountry
   //          .get(1)
   //          .then(() => {
   //             console.log("success");
   //             window.location.href = "/admin/catalog/defect-level";
   //          })
   //          .catch((err) => {
   //             console.log(err)
   //             // logout();
   //             window.location.replace("/admin/login");
   //          });
   //    };
   //    check();
   // }, []);
   return <div> </div>;
}
