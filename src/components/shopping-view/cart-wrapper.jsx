import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems?.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        {cartItems && cartItems?.length > 0
          ? cartItems?.map((item) => <UserCartItemsContent cartItems={item} />)
          : null}

        <div className="mt-8 space-y-4">
          <div>
            <div className="mt-8 space-y-4">
              <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold">${totalCartAmount}</span>
              </div>
            </div>
            <Button
              onClick={() => {
                navigate("/shop/checkout");
                setOpenCartSheet(false);
              }}
              className="mt-6 w-full"
            >
              Checkout
            </Button>
          </div>
        </div>
      </SheetContent>
    </>
  );
}
export default UserCartWrapper;

// promo code vala code

// import { useNavigate } from "react-router-dom";
// import { Button } from "../ui/button";
// import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
// import UserCartItemsContent from "./cart-items-content";
// import { useState } from "react";

// function UserCartWrapper({ cartItems, setOpenCartSheet }) {
//   const navigate = useNavigate();

//   const [promoCode, setPromoCode] = useState("");
//   const [discountedPrice, setDiscountedPrice] = useState();
//   const [errorMessage, setErrorMessage] = useState("");

//   const validPromoCode = {
//     casualstore10: "0.1",
//     welcome20: "0.2",
//   };

//   const handlePromoCode = (e) => {
//     setPromoCode(e.target.value);
//     setErrorMessage("");
//   };

//   const applyPromoCode = () => {
//     const discount = parseFloat(validPromoCode[promoCode]);
//     if (discount) {
//       setDiscountedPrice(totalCartAmount * (1 - discount));
//       setErrorMessage("Promo code applied successfully!");
//       setPromoCode("");
//     } else {
//       setErrorMessage("Invalid promo code!");
//       setPromoCode("");
//     }
//   };

//   const totalCartAmount =
//     cartItems && cartItems?.length > 0
//       ? cartItems.reduce(
//           (sum, currentItem) =>
//             sum +
//             (currentItem?.salePrice > 0
//               ? currentItem?.salePrice
//               : currentItem?.price) *
//               currentItem?.quantity,
//           0
//         )
//       : 0;

//   return (
//     <>
//       <SheetContent className="sm:max-w-md">
//         <SheetHeader>
//           <SheetTitle>Your Cart</SheetTitle>
//         </SheetHeader>

//         {cartItems && cartItems?.length > 0
//           ? cartItems?.map((item) => <UserCartItemsContent cartItems={item} />)
//           : null}

//         <div className="mt-8 space-y-4">
//           <div>
//             <div className="mt-8 space-y-4"></div>
//             <div className="mt-8 space-y-6">
//               {/* Unique Promo Code Card */}
//               <div className="relative rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-md p-3 shadow-lg dark:bg-white/5 dark:border-zinc-700">
//                 <div className="flex items-center gap-2 mb-3">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 text-primary"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 14l2-2m0 0l2-2m-2 2v6m0-6V4m6 6H6"
//                     />
//                   </svg>
//                   <h3 className="text-sm font-semibold text-black dark:text-gray-300">
//                     PROMO CODE{" "}
//                   </h3>
//                 </div>
//                 <div className="flex gap-2">
//                   <input
//                     onChange={handlePromoCode}
//                     type="text"
//                     value={promoCode}
//                     placeholder="Enter a promo code"
//                     className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm shadow-inner outline-none focus:border-primary focus:ring-1 focus:ring-primary transition dark:bg-zinc-900 dark:border-zinc-700"
//                   />
//                   <Button
//                     onClick={applyPromoCode}
//                     className="rounded-xl px-5 text-sm shadow-md"
//                   >
//                     Apply
//                   </Button>
//                 </div>
//                 <div
//                   className={`text-center mt-2 font-semibold ${
//                     errorMessage === "Promo code applied successfully!"
//                       ? "text-green-400"
//                       : "text-red-500"
//                   }`}
//                 >
//                   {errorMessage && <p>{errorMessage}</p>}
//                 </div>
//               </div>

//               {/* Cart Total Summary */}
//               <div className="flex justify-between">
//                 <span className="font-bold">Total</span>
//                 <span className="font-bold flex gap-2 items-center text-lg">
//                   {discountedPrice < totalCartAmount && (
//                     <span className="line-through text-gray-400 text-base"></span>
//                   )}
//                   <span className="text-black">
//                     $
//                     {discountedPrice > 0
//                       ? discountedPrice.toFixed(2)
//                       : totalCartAmount.toFixed(2)}
//                   </span>
//                 </span>
//               </div>

//               <div
//                 onClick={() => {
//                   navigate("/shop/checkout");
//                   setOpenCartSheet(false);
//                 }}
//                 class="bg-primary  text-center cursor-pointer text-md font-semibold py-2 max-w-5xl rounded-xl text-white hover:scale-95 transition-transform"
//               >
//                 Checkout{" "}
//               </div>
//             </div>
//           </div>
//         </div>
//       </SheetContent>
//     </>
//   );
// }
// export default UserCartWrapper;
