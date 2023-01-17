import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useAuth } from "~/features/auth/useAuth";
import { Navigate, Link } from "react-router-dom";
import { useSubscriberLogin } from "../hooks/subscriber/useSubscriberLogin";
import { SUBSCRIBER_KEY } from "~/utils/tokenStorage";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "~/features/auth/loginSchema";
import { useTranslation } from "react-i18next";

export default function Login() {
   const { subscriberToken, setAuth } = useAuth();
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

   const subscriberLogin = useSubscriberLogin({
      onSuccess(data) {
         setAuth(SUBSCRIBER_KEY, data.token);
      },
   });

   function onSubmit(data) {
      subscriberLogin.mutate(data);
   }

   if (subscriberToken) {
      return <Navigate to="/facility-management" replace />;
   }

   return (
      <div className="pages-body flex flex-column">
         <div className="align-self-center mt-auto mb-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="pages-panel card flex flex-column">
                  <h2 className="py-4">Subscriber Log In</h2>

                  <div className="input-panel flex flex-column">
                     <div className="p-inputgroup flex-column">
                        <span className="p-float-label">
                           <Controller
                              name="email"
                              control={control}
                              render={({ field }) => (
                                 <InputText
                                    type="email"
                                    id="subscriber-email"
                                    {...field}
                                 />
                              )}
                           />
                           <label htmlFor="subscriber-email">Email</label>
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
                                    id="subscriber-password"
                                    {...field}
                                 />
                              )}
                           />
                           <label htmlFor="subscriber-password">Password</label>
                        </span>
                        {errors.password?.message && (
                           <small className="p-invalid">
                              {t(errors.password?.message)}
                           </small>
                        )}
                     </div>
                     <span>
                        {subscriberLogin.error &&
                        subscriberLogin.error.status < 500
                           ? subscriberLogin.error.data.message
                           : subscriberLogin?.error?.statusText}
                     </span>
                  </div>
                  <Button
                     loading={subscriberLogin.isLoading}
                     label="LOGIN"
                     className="login-button mb-4"
                  />
                  <Link className="mb-4" to="/dashboard/register">
                     subscriber register
                  </Link>
                  <Link to="/admin/login">admin login</Link>
               </div>
            </form>
         </div>
      </div>
   );
}
