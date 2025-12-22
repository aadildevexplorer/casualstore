// import React, { useEffect } from "react";
// import { Navigate, Route, Routes } from "react-router-dom";
// import AuthLayout from "./components/auth/layout";
// import AuthLogin from "./Pages/auth/login";
// import AuthRegister from "./Pages/auth/register";
// import AdminLayout from "./components/admin-view/layout";
// import AdminDashboard from "./Pages/admin-view/dashboard";
// import AdminFeatures from "./Pages/admin-view/features";
// import AdminOrders from "./Pages/admin-view/orders";
// import AdminProducts from "./Pages/admin-view/products";
// import NotFound from "./Pages/not-found";
// import ShoppingAccount from "./Pages/shopping-view/account";
// import ShoppingCheckout from "./Pages/shopping-view/checkout";
// import ShoppingHome from "./Pages/shopping-view/home";
// import ShoppingListing from "./Pages/shopping-view/listing";
// import ShoppingLayout from "./components/shopping-view/layout";
// import CheckAuth from "./components/common/check-auth";
// import UnauthPage from "./Pages/unauth-page";
// import { useDispatch, useSelector } from "react-redux";
// import { checkAuth } from "./store/auth-slice";
// import { Skeleton } from "@/components/ui/skeleton";
// import AdminUsers from "./Pages/admin-view/users";
// import PaypalReturnPage from "./Pages/shopping-view/paypal-return";
// import PaymentSuccessPage from "./Pages/shopping-view/payment-success";
// import SearchProducts from "./Pages/shopping-view/search";
// import Footer from "./Pages/shopping-view/footer";

// import { QueryClientProvider } from "@tanstack/react-query";
// import queryClient from "./query-client";
// import CookieBanner from "./components/cookies/CookieBanner";
// import AdminCookie from "./components/admin-view/cookies";

// const App = () => {
//   const { user, isAuthenticated, isLoading } = useSelector(
//     (state) => state.auth
//   );
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(checkAuth());
//   }, [dispatch]);

//   if (isLoading) {
//     return <Skeleton className="w-[800] bg-black h-[640px]" />;
//   }

//   return (
//     <QueryClientProvider client={queryClient}>
//       <div className="flex flex-col overflow-hidden bg-white">
//         <Routes>
//           <Route path="/" element={<Navigate to="/shop/home" replace />} />

//           {/* Auth routes */}
//           <Route
//             path="/auth"
//             element={
//               <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//                 <AuthLayout />
//               </CheckAuth>
//             }
//           >
//             <Route path="login" element={<AuthLogin />} />
//             <Route path="register" element={<AuthRegister />} />
//           </Route>

//           {/* Admin routes */}
//           <Route
//             path="/admin"
//             element={
//               <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//                 <AdminLayout />
//               </CheckAuth>
//             }
//           >
//             <Route path="dashboard" element={<AdminDashboard />} />
//             <Route path="products" element={<AdminProducts />} />
//             <Route path="orders" element={<AdminOrders />} />
//             <Route path="users" element={<AdminUsers />} />
//             <Route path="features" element={<AdminFeatures />} />
//             <Route path="cookies" element={<AdminCookie />} />
//           </Route>

//           {/* Shopping routes */}
//           <Route path="/shop" element={<ShoppingLayout />}>
//             <Route path="account" element={<ShoppingAccount />} />
//             <Route path="checkout" element={<ShoppingCheckout />} />
//             <Route path="home" element={<ShoppingHome />} />
//             <Route path="listing" element={<ShoppingListing />} />
//             <Route path="paypal-return" element={<PaypalReturnPage />} />
//             <Route path="payment-success" element={<PaymentSuccessPage />} />
//             <Route path="search" element={<SearchProducts />} />
//           </Route>

//           <Route path="/unauth-page" element={<UnauthPage />} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//         <CookieBanner />
//         <Footer />
//       </div>
//     </QueryClientProvider>
//   );
// };

// export default App;



import React, { useEffect, lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";

import { checkAuth } from "./store/auth-slice";
import queryClient from "./query-client";

import CheckAuth from "./components/common/check-auth";
import CookieBanner from "./components/cookies/CookieBanner";
import { Skeleton } from "@/components/ui/skeleton";

/* =======================
   Lazy Loaded Layouts
======================= */
const AuthLayout = lazy(() => import("./components/auth/layout"));
const AdminLayout = lazy(() => import("./components/admin-view/layout"));
const ShoppingLayout = lazy(() => import("./components/shopping-view/layout"));

/* =======================
   Lazy Loaded Auth Pages
======================= */
const AuthLogin = lazy(() => import("./Pages/auth/login"));
const AuthRegister = lazy(() => import("./Pages/auth/register"));

/* =======================
   Lazy Loaded Admin Pages
======================= */
const AdminDashboard = lazy(() => import("./Pages/admin-view/dashboard"));
const AdminProducts = lazy(() => import("./Pages/admin-view/products"));
const AdminOrders = lazy(() => import("./Pages/admin-view/orders"));
const AdminUsers = lazy(() => import("./Pages/admin-view/users"));
const AdminFeatures = lazy(() => import("./Pages/admin-view/features"));
const AdminCookie = lazy(() => import("./components/admin-view/cookies"));

/* =======================
   Lazy Loaded Shopping Pages
======================= */
const ShoppingHome = lazy(() => import("./Pages/shopping-view/home"));
const ShoppingListing = lazy(() => import("./Pages/shopping-view/listing"));
const ShoppingAccount = lazy(() => import("./Pages/shopping-view/account"));
const ShoppingCheckout = lazy(() => import("./Pages/shopping-view/checkout"));
const PaypalReturnPage = lazy(() =>
  import("./Pages/shopping-view/paypal-return")
);
const PaymentSuccessPage = lazy(() =>
  import("./Pages/shopping-view/payment-success")
);
const SearchProducts = lazy(() => import("./Pages/shopping-view/search"));
const Footer = lazy(() => import("./Pages/shopping-view/footer"));

/* =======================
   Other Pages
======================= */
const UnauthPage = lazy(() => import("./Pages/unauth-page"));
const NotFound = lazy(() => import("./Pages/not-found"));

const App = () => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return <Skeleton className="w-full h-screen" />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Skeleton className="w-full h-screen" />}>
        <div className="flex flex-col overflow-hidden bg-white">
          <Routes>
            <Route path="/" element={<Navigate to="/shop/home" replace />} />

            {/* Auth routes */}
            <Route
              path="/auth"
              element={
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <AuthLayout />
                </CheckAuth>
              }
            >
              <Route path="login" element={<AuthLogin />} />
              <Route path="register" element={<AuthRegister />} />
            </Route>

            {/* Admin routes */}
            <Route
              path="/admin"
              element={
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <AdminLayout />
                </CheckAuth>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="features" element={<AdminFeatures />} />
              <Route path="cookies" element={<AdminCookie />} />
            </Route>

            {/* Shopping routes */}
            <Route path="/shop" element={<ShoppingLayout />}>
              <Route path="home" element={<ShoppingHome />} />
              <Route path="listing" element={<ShoppingListing />} />
              <Route path="account" element={<ShoppingAccount />} />
              <Route path="checkout" element={<ShoppingCheckout />} />
              <Route path="paypal-return" element={<PaypalReturnPage />} />
              <Route path="payment-success" element={<PaymentSuccessPage />} />
              <Route path="search" element={<SearchProducts />} />
            </Route>

            <Route path="/unauth-page" element={<UnauthPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <CookieBanner />
          <Footer />
        </div>
      </Suspense>
    </QueryClientProvider>
  );
};

export default App;
