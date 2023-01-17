import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useAuth } from "~/features/auth/useAuth";
import { Navigate } from "react-router-dom";
import { useSubscriberRegister } from "../hooks/subscriber/useSubscriberRegister";
import { SUBSCRIBER_KEY } from "~/utils/tokenStorage";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "~/features/auth/registerSchema";
import { useTranslation } from "react-i18next";

export default function RegisterSubscriber() {
   const { subscriberToken, setAuth } = useAuth();
   const { t } = useTranslation();
   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(registerSchema),
      defaultValues: {
         email: "",
         name: "",
         username: "",
         password: "",
      },
   });
   const subscriberRegister = useSubscriberRegister({
      onSuccess(data) {
         setAuth(SUBSCRIBER_KEY, data.token);
      },
      onError(error) {
         console.log(error);
      },
   });

   function onSubmit(data) {
      subscriberRegister.mutate(data);
   }

   if (subscriberToken) {
      return <Navigate to="/facility-management" replace />;
   }

   return (
      <div className="pages-body flex flex-column">
         <div className="align-self-center mt-auto mb-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="pages-panel card flex flex-column">
                  <h2 className="py-4">Subscriber Register</h2>

                  <div className="input-panel flex flex-column">
                     <div className="p-inputgroup mb-4 flex-column">
                        <span className="p-float-label">
                           <Controller
                              name="email"
                              control={control}
                              render={({ field }) => (
                                 <InputText
                                    type="email"
                                    id="subscriber-register-email"
                                    {...field}
                                 />
                              )}
                           />
                           <label htmlFor="subscriber-register-email">
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
                              name="name"
                              control={control}
                              render={({ field }) => (
                                 <InputText
                                    id="subscriber-register-name"
                                    {...field}
                                 />
                              )}
                           />
                           <label htmlFor="subscriber-register-name">
                              Name
                           </label>
                        </span>
                        {errors.name?.message && (
                           <small className="p-invalid">
                              {t(errors.name?.message)}
                           </small>
                        )}
                     </div>

                     <div className="p-inputgroup mb-4 flex-column">
                        <span className="p-float-label">
                           <Controller
                              name="username"
                              control={control}
                              render={({ field }) => (
                                 <InputText
                                    id="subscriber-register-username"
                                    {...field}
                                 />
                              )}
                           />
                           <label htmlFor="subscriber-register-username">
                              username
                           </label>
                        </span>
                        {errors.username?.message && (
                           <small className="p-invalid">
                              {t(errors.username?.message)}
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
                                    id="subscriber-register-password"
                                    {...field}
                                 />
                              )}
                           />
                           <label htmlFor="subscriber-register-password">
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
                        {subscriberRegister.error &&
                        subscriberRegister.error.status < 500
                           ? subscriberRegister.error.data.message
                           : subscriberRegister?.error?.statusText}
                     </span>
                  </div>
                  <Button
                     loading={subscriberRegister.isLoading}
                     label="LOGIN"
                     className="login-button mb-4"
                  />
               </div>
            </form>
         </div>
      </div>
   );
}
