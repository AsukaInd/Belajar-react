import React, { useState } from "react";
import { PayLaterModal } from "./PayLaterModal";

const PAYMENT_METHOD = [
   {
      value: "paypal",
      title: "Pay with Paypal",
      description: "Paypal account holder",
      logo: "/icons/paypal.svg",
   },
   {
      value: "visa",
      title: "Pay with Debit/Credit Card",
      description: "Payments are processed by our partner",
      logo: "/icons/visa.svg",
   },
];

function Payment() {
   const [paymentSelected, setPaymentSelected] = useState();
   const [isOpenModal, setIsOpenModal] = useState(false);
   return (
      <>
         <div className="md:w-[512px]  flex flex-col gap-8">
            <div
               style={{ boxShadow: "1px 1px 8px #d9d2d2" }}
               className="border border-[#d9d2d2] p-4 rounded-lg"
            >
               <h5>Total Payment</h5>
               <div className="flex justify-between">
                  <span>Sub </span>
                  <span>$309</span>
               </div>
               <div className="flex justify-between mt-2">
                  <span>Shipping Fee</span>
                  <span>$129</span>
               </div>
               <div
                  style={{ borderBottom: "1px #d9d2d2 solid" }}
                  className="my-4"
               />

               <div className="flex justify-between mt-4">
                  <b>Total</b>
                  <span className="font-bold text-white bg-blue-2 rounded-full p-2">
                     $2.500
                  </span>
               </div>
            </div>
            <div
               style={{ boxShadow: "1px 1px 8px #d9d2d2" }}
               className="border border-[#d9d2d2] p-4 rounded-lg"
            >
               <h5>Payment Method</h5>
               {PAYMENT_METHOD.map((item, index) => (
                  <div
                     style={{
                        border:
                           item.value === paymentSelected
                              ? "solid #2854F6 1px"
                              : "solid #e9e9e9 1px",
                     }}
                     className={`${
                        item.value === paymentSelected
                           ? "bg-white-f4 border-blue-2 border-1"
                           : ""
                     } flex gap-4 mt-2 cursor-pointer p-2 rounded-lg`}
                     onClick={() => setPaymentSelected(item.value)}
                     key={index}
                  >
                     <img src={item.logo} alt="payment method" />
                     <div>
                        <b>{item.title}</b>
                        <p className="text-gray-500 text-sm">
                           {item.description}
                        </p>
                     </div>
                  </div>
               ))}
               <div
                  style={{ borderBottom: "1px #d9d2d2 solid" }}
                  className="my-4"
               />
               <div
                  className={`${
                     paymentSelected
                        ? "bg-blue-2 cursor-pointer"
                        : "bg-[#A7A7A7]"
                  }  flex w-full text-white  font-bold p-3 rounded-md`}
               >
                  <div className="flex mx-auto my-auto">
                     <img
                        src="/icons/Wallet_fill.svg"
                        alt="wallet"
                        className="my-auto mx-2"
                     />{" "}
                     Pay Now
                  </div>
               </div>
               <p className="text-center my-2 text-[#A7A7A7] font-bold">OR</p>
               <div
                  className={`${
                     paymentSelected ? "text-blue-2 cursor-pointer" : ""
                  } flex bg-white-fa w-full font-bold p-3 rounded-md`}
               >
                  <div className="flex mx-auto my-auto" onClick={() => {
                      if(paymentSelected){
                          setIsOpenModal(true)
                      }
                  }}>
                     Confirm & Pay Later
                  </div>
               </div>

               <p className="text-center my-2 text-[#A7A7A7] text-xs">
                  An additional 5% charge will be applied to the order if you
                  choose to pay after the service has been performed.
               </p>
            </div>
         </div>

         <PayLaterModal
            isOpen={isOpenModal}
            onClose={() => setIsOpenModal(false)}
         />
      </>
   );
}

export default Payment;
