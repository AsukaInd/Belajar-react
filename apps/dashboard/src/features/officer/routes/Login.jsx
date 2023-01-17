import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useAuth } from "~/features/auth/useAuth";
import { Navigate } from "react-router-dom";
import { useOfficerLogin } from "../hooks/useOfficerLogin";
import { OFFICER_KEY } from "~/utils/tokenStorage";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "~/features/auth/loginSchema";
import { useTranslation } from "react-i18next";
import { Container } from "../components/Container";
import { SimpleToast } from "../components/SimpleToast";
import { useState } from "react";

export default function Login() {
   const [isOpen, setIsOpen] = useState(false)
   const [errorMessage, setErrorMessage] = useState(null)
   const { officerToken, setAuth } = useAuth();
   const { t } = useTranslation();
   const {
      control,
      handleSubmit,
      formState: { errors, isValid },
   } = useForm({
      mode: "onChange",
      resolver: yupResolver(loginSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });
   const officerLogin = useOfficerLogin({
      onSuccess(data) {
         setAuth(OFFICER_KEY, data.token);
      },
      onError(error) {
         setErrorMessage(error?.data?.message ?? 'Server Error')
         setIsOpen(true)
      },
   });

   function onSubmit(data) {
      setIsOpen(false)
      setErrorMessage(null)
      officerLogin.mutate(data);
   }

   if (officerToken) {
      return <Navigate to="/officer" replace />;
   }

   return (
      <>
         <form onSubmit={handleSubmit(onSubmit)}>
            <Container className="px-[24px] py-[36px] shadow-lg flex flex-col gap-[36px] items-start h-screen">
               <img className="h-[35px]" src="/inspxt-logo.png" />
               <div>
                  <h1 className="font-extrabold text-[18px] mb-[8px]">
                     <span className="text-blue-4">Login</span> with your account
                  </h1>
                  <p>
                     To access the main site, please login first by filling your email and password
                  </p>
               </div>
               <div className="w-full flex flex-col gap-[16px]">
                  <div className="flex flex-col gap-[8px]">
                     <label htmlFor="email">
                        Email
                     </label>
                     <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                           <InputText
                              id="email"
                              placeholder="example@domain.com"
                              {...field}
                           />
                        )}
                     />
                     {errors.email?.message && (
                        <small className="p-invalid">{t(errors.email?.message)}</small>
                     )}
                  </div>
                  <div className="flex flex-col gap-[8px]">
                     <label htmlFor="password">
                        Password
                     </label>
                     <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                           <InputText
                              type="password"
                              id="passsword"
                              placeholder="*********"
                              {...field}
                           />
                        )}
                     />
                     {errors.password?.message && (
                        <small className="p-invalid">{t(errors.password?.message)}</small>
                     )}
                  </div>
               </div>
               <Button
                  disabled={!isValid}
                  loading={officerLogin.isLoading}
                  label="Login"
                  className="w-full bg-blue-4 mt-auto"
               />
            </Container>
         </form>
         <SimpleToast
            className="bottom-[100px]"
            open={isOpen}
            closeButton={
               <button className="font-bold" onClick={() => setIsOpen(false)}>Try Again</button>
            }
         >
            {errorMessage}
         </SimpleToast>
      </>
   )
}
