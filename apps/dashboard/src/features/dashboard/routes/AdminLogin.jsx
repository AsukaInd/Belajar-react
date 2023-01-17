import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useAuth } from "~/features/auth/useAuth";
import { Navigate } from "react-router-dom";
import { useAdminLogin } from "~/features/dashboard/facilityManagement/hooks/useAdminLogin";
import { ADMIN_KEY } from "~/utils/tokenStorage";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "~/features/auth/loginSchema";
import { useTranslation } from "react-i18next";

export default function AdminLogin() {
   const { adminToken, setAuth } = useAuth();
   const { t } = useTranslation();
   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(loginSchema),
      defaultValues: {
         email: "admin@guard-tour.com",
         password: "password",
      },
   });
   const adminLogin = useAdminLogin({
      onSuccess(data) {
         setAuth(ADMIN_KEY, data.token);
      },
      onError(error) {
         console.log(error);
      },
   });

   function onSubmit(data) {
      adminLogin.mutate(data);
   }

   if (adminToken) {
      return <Navigate to="/admin/product-inspection" replace />;
   }

   return (
      <div className="pages-body flex flex-column">
         <div className="align-self-center mt-auto mb-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="pages-panel card flex flex-column">
                  <h2 className="py-4">Admin Log In</h2>

                  <div className="input-panel flex flex-column">
                     <div className="p-inputgroup flex-column">
                        <span className="p-float-label">
                           <Controller
                              name="email"
                              control={control}
                              render={({ field }) => (
                                 <InputText
                                    type="email"
                                    id="admin-email"
                                    {...field}
                                 />
                              )}
                           />
                           <label htmlFor="admin-email">Email</label>
                        </span>
                        {errors.email?.message && (
                           <small className="p-invalid">
                              {t(errors.email?.message)}
                           </small>
                        )}
                     </div>

                     <div className="p-inputgroup mt-3 mb-6 flex-column">
                        <span className="p-float-label">
                           <Controller
                              name="password"
                              control={control}
                              render={({ field }) => (
                                 <InputText
                                    type="password"
                                    id="admin-password"
                                    {...field}
                                 />
                              )}
                           />
                           <label htmlFor="admin-password">Password</label>
                        </span>
                        {errors.password?.message && (
                           <small className="p-invalid">
                              {t(errors.password?.message)}
                           </small>
                        )}
                     </div>
                     <span>
                        {adminLogin.error && adminLogin.error.status < 500
                           ? adminLogin.error.data.message
                           : adminLogin?.error?.statusText}
                     </span>
                  </div>
                  <Button
                     loading={adminLogin.isLoading}
                     label="LOGIN"
                     className="login-button mb-4"
                  />
               </div>
            </form>
         </div>
      </div>
   );
}
