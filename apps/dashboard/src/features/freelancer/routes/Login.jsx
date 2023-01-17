import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useAuth } from "~/features/auth/useAuth";
import { Navigate, Link } from "react-router-dom";
import { useFreelancerLogin } from "../hooks/freelancer/useFreelancerLogin";
import { FREELANCER_KEY } from "~/utils/tokenStorage";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "~/features/auth/loginSchema";
import { useTranslation } from "react-i18next";

export default function Login() {
   const { freelancerToken, setAuth } = useAuth();
   const { t } = useTranslation();
   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(loginSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const freelancerLogin = useFreelancerLogin({
      onSuccess(data) {
         setAuth(FREELANCER_KEY, data.token);
      },
   });

   function onSubmit(data) {
      freelancerLogin.mutate(data);
   }

   if (freelancerToken) {
      return <Navigate to="/freelancer" replace />;
   }

   return (
      <div className="pages-body flex flex-column">
         <div className="align-self-center mt-auto mb-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="pages-panel card flex flex-column">
                  <h2 className="py-4">Freelancer Log In</h2>

                  <div className="input-panel flex flex-column">
                     <div className="p-inputgroup flex-column">
                        <span className="p-float-label">
                           <Controller
                              name="email"
                              control={control}
                              render={({ field }) => (
                                 <InputText
                                    type="email"
                                    id="freelancer-email"
                                    {...field}
                                 />
                              )}
                           />
                           <label htmlFor="freelancer-email">Email Address</label>
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
                                    id="freelancer-password"
                                    {...field}
                                 />
                              )}
                           />
                           <label htmlFor="freelancer-password">Password</label>
                        </span>
                        {errors.password?.message && (
                           <small className="p-invalid">
                              {t(errors.password?.message)}
                           </small>
                        )}
                     </div>
                     <span>
                        {freelancerLogin.error &&
                           freelancerLogin.error.status < 500
                           ? freelancerLogin.error.data.message
                           : freelancerLogin?.error?.statusText}
                     </span>
                  </div>
                  <Button
                     loading={freelancerLogin.isLoading}
                     label="LOGIN"
                     className="login-button mb-4"
                  />
                  <Link className="mb-4" to="/freelancer/user/register">
                     Register As Freelancer
                  </Link>
                  <Link to="/admin/freelancer/login">Admin Login</Link>
               </div>
            </form>
         </div>
      </div>
   );
}