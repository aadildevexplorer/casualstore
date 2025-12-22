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
    // return <Skeleton className="w-full h-screen" />;
    return (
      <div className="fixed inset-0 flex items-center justify-center loader">
        <svg className="spinner" viewBox="25 25 50 50">
          <circle className="path" cx="50" cy="50" r="20"></circle>
        </svg>
      </div>
    );
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
