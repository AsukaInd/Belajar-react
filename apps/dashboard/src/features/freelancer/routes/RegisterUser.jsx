import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useAuth } from "~/features/auth/useAuth";
import { Navigate } from "react-router-dom";
import { useUserRegister } from "../hooks/freelancer/useUserRegister";
import { FREELANCER_KEY } from "~/utils/tokenStorage";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { freelancerRegisterSchema } from "~/features/auth/registerSchema";
import { useTranslation } from "react-i18next";

export default function RegisterUser() {
   const { freelancerToken, setAuth } = useAuth();
   const { t } = useTranslation();
   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(freelancerRegisterSchema),
      defaultValues: {
         username: "",
         email: "",
         password: "",
      },
   });
   const userRegister = useUserRegister({
      onSuccess(data) {
         setAuth(FREELANCER_KEY, data.token);
      },
      onError(error) {
         console.log(error);
      },
   });

   function onSubmit(data) {
      userRegister.mutate(data);
   }

   if (freelancerToken) {
      return <Navigate to="/freelancer" replace />;
   }

   return (
      <div className="pages-body flex flex-column">
         <div className="align-self-center mt-auto mb-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="pages-panel card flex flex-column">
                  <h2 className="py-4">Register as Freelancer</h2>

                  <div className="p-inputgroup mb-4 flex-column">
                     <span className="p-float-label">
                        <Controller
                           name="username"
                           control={control}
                           render={({ field }) => (
                              <InputText
                                 id="freelancer-register-username"
                                 {...field}
                              />
                           )}
                        />
                        <label htmlFor="freelancer-register-username">
                           username
                        </label>
                     </span>
                     {errors.username?.message && (
                        <small className="p-invalid">
                           {t(errors.username?.message)}
                        </small>
                     )}
                  </div>

                  <div className="input-panel flex flex-column">
                     <div className="p-inputgroup mb-4 flex-column">
                        <span className="p-float-label">
                           <Controller
                              name="email"
                              control={control}
                              render={({ field }) => (
                                 <InputText
                                    type="email"
                                    id="freelancer-register-email"
                                    {...field}
                                 />
                              )}
                           />
                           <label htmlFor="freelancer-register-email">
                              Email
                           </label>
                        </span>
                        {errors.email?.message && (
                           <small className="p-invalid">
                              {t(errors.email?.message)}
                           </small>
                        )}
                     </div>

                     <div className="p-inputgroup mb-4 flex-column">
                        <span className="p-float-label">
                           <Controller
                              name="password"
                              control={control}
                              render={({ field }) => (
                                 <InputText
                                    type="password"
                                    id="freelancer-register-password"
                                    {...field}
                                 />
                              )}
                           />
                           <label htmlFor="freelancer-register-password">
                              Password
                           </label>
                        </span>
                        {errors.password?.message && (
                           <small className="p-invalid">
                              {t(errors.password?.message)}
                           </small>
                        )}
                     </div>
                     <span>
                        {userRegister.error &&
                           userRegister.error.status < 500
                           ? userRegister.error.data.message
                           : userRegister?.error?.statusText}
                     </span>
                  </div>
                  <Button
                     loading={userRegister.isLoading}
                     label="REGISTER"
                     className="login-button mb-4"
                  />
               </div>
            </form>
         </div>
      </div>
   );
}
