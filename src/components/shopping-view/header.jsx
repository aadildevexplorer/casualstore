// import { CircleUser, HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
// import {
//   Link,
//   useLocation,
//   useNavigate,
//   useParams,
//   useSearchParams,
// } from "react-router-dom";
// import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
// import { Button } from "../ui/button";
// import { useDispatch, useSelector } from "react-redux";
// import { ShoppingViewHeaderMenuItems } from "@/config";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import { Avatar, AvatarFallback } from "../ui/avatar";
// import { logoutUser } from "@/store/auth-slice";
// import { useToast } from "@/hooks/use-toast";
// import UserCartWrapper from "./cart-wrapper";
// import { useEffect, useState } from "react";
// import { fetchCartItems } from "@/store/shop/cart-slice";
// import { Badge } from "../ui/badge";
// import { Label } from "../ui/label";

// function HeaderRightContent() {
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { user } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const [openCartSheet, setOpenCartSheet] = useState(false);
//   const dispatch = useDispatch();
//   const { toast } = useToast();

//   const handleLogOut = () => {
//     dispatch(logoutUser());
//     toast({
//       title: "Logged out SuccessFully",
//     });
//   };

//   useEffect(() => {
//     dispatch(fetchCartItems(user?.id));
//   }, [dispatch]);

//   return (
//     <>
//       <div className="flex flex-col gap-4 lg:items-center lg:flex-row">
//         <Sheet
//           open={openCartSheet}
//           onOpenChange={() => setOpenCartSheet(false)}
//         >
//           <Button
//             onClick={() => setOpenCartSheet(true)}
//             variant="outline"
//             className="relative"
//             size="icon"
//           >
//             <ShoppingCart className="w-6 h-6">
//               <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
//                 {/* {cartItems?.length || 0} */}2
//               </span>{" "}
//               <span className="sr-only">User Cart</span>
//             </ShoppingCart>
//           </Button>
//           <UserCartWrapper
//             setOpenCartSheet={setOpenCartSheet}
//             cartItems={
//               cartItems && cartItems.items && cartItems.items.length > 0
//                 ? cartItems.items
//                 : []
//             }
//           />
//         </Sheet>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Avatar className="bg-black cursor-pointer">
//               <AvatarFallback className="font-extrabold text-white bg-black">
//                 {/* {user?.userName[0]?.toUpperCase()} */}
//                 <CircleUser />
//               </AvatarFallback>
//             </Avatar>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent side="right" className="w-56">
//             <DropdownMenuLabel>{user?.userName}</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem
//               className="cursor-pointer"
//               onClick={() => navigate("/shop/account")}
//             >
//               <UserCog className="w-4 h-4 mr-2" />
//               Account
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem onClick={handleLogOut} className="cursor-pointer">
//               <LogOut className="w-4 h-4 mr-2" />
//               Logout
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </>
//   );
// }

// function MenuItems() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [searchParams, setSearchParams] = useSearchParams();

//   const handleNavigate = (getCurrentMenuItem) => {
//     sessionStorage.removeItem("filters");
//     const currentFilter =
//       getCurrentMenuItem.id !== "home" &&
//       getCurrentMenuItem.id !== "products" &&
//       getCurrentMenuItem.id !== "search"
//         ? {
//             category: [getCurrentMenuItem.id],
//           }
//         : null;

//     sessionStorage.setItem("filters", JSON.stringify(currentFilter));
//     location.pathname.includes("listing") && currentFilter !== null
//       ? setSearchParams(
//           new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
//         )
//       : navigate(getCurrentMenuItem.path);
//   };
//   return (
//     <>
//       <nav className="flex flex-col gap-6 mb-3 lg:mb-0 lg:items-center lg:flex-row">
//         {ShoppingViewHeaderMenuItems.map((menuItem) => (
//           <Label
//             onClick={() => handleNavigate(menuItem)}
//             className="text-sm font-medium cursor-pointer"
//             key={menuItem.id}
//           >
//             {menuItem.label}
//           </Label>
//         ))}
//       </nav>
//     </>
//   );
// }

// function ShoppingHeader() {
//   const { isAuthenticated } = useSelector((state) => state.auth);

//   return (
//     <>
//       <header className="sticky top-0 z-40 w-full border-b bg-background">
//         <div className="flex items-center justify-between h-16 px-4 md:px-6">
//           <Link to="/shop/home" className="flex items-center gap-2">
//             <HousePlug className="w-6 h-6" />
//             <span className="font-bold">Ecommerce</span>
//           </Link>
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="outline" size="icon" className="lg:hidden ">
//                 <Menu className="w-6 h-6" />
//                 <span className="sr-only">Toggle header menu</span>
//               </Button>
//             </SheetTrigger>

//             <SheetContent side="left" className="w-full max-w-xs">
//               <MenuItems />
//               <HeaderRightContent />{" "}
//             </SheetContent>
//           </Sheet>

//           <div className="hidden lg:block">
//             <MenuItems />
//           </div>
//           <div className="hidden lg:block">
//             <HeaderRightContent />{" "}
//           </div>
//         </div>
//       </header>
//     </>
//   );
// }

// export default ShoppingHeader;

import {
  CircleUser,
  HousePlug,
  LogOut,
  Menu,
  ShoppingCart,
  UserCog,
} from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";

function HeaderRightContent() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleLogOut = () => {
    dispatch(logoutUser());
    toast({
      title: "Logged out SuccessFully",
    });
  };

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-col gap-4 lg:items-center lg:flex-row">

        <Sheet
          open={openCartSheet}
          onOpenChange={() => setOpenCartSheet(false)}
        >
          <Button
            onClick={() => setOpenCartSheet(true)}
            variant="outline"
            className="relative"
            size="icon"
          >
            <div>
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -right-2">
                {cartItems?.items?.length || 0}
              </span>
              <span className="sr-only">User Cart</span>
            </div>
          </Button>
          <UserCartWrapper
            setOpenCartSheet={setOpenCartSheet}
            cartItems={
              cartItems && cartItems.items && cartItems.items.length > 0
                ? cartItems.items
                : []
            }
          />
        </Sheet>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="bg-black cursor-pointer">
                <AvatarFallback className="font-extrabold text-white bg-black">
                  <CircleUser />
                </AvatarFallback>{" "}
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" className="w-56">
              <DropdownMenuLabel>{user?.userName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate("/shop/account")}
              >
                <UserCog className="w-4 h-4 mr-2" />
                Account
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogOut}
                className="cursor-pointer"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="bg-black cursor-pointer">
                <AvatarFallback className="font-extrabold text-white bg-black">
                  <CircleUser />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" className="w-56">
              <DropdownMenuLabel>{user?.userName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate("/shop/account")}
              >
                <UserCog className="w-4 h-4 mr-2" />
                Account
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link to="/auth/login">
                <DropdownMenuItem className="cursor-pointer">
                  <CircleUser className="w-4 h-4 mr-2" />
                  Login
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </>
  );
}

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleNavigate = (getCurrentMenuItem) => {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  };
  return (
    <>
      <nav className="flex flex-col gap-6 mb-3 lg:mb-0 lg:items-center lg:flex-row">
        {ShoppingViewHeaderMenuItems.map((menuItem) => (
          <Label
            onClick={() => handleNavigate(menuItem)}
            className="text-sm font-medium cursor-pointer"
            key={menuItem.id}
          >
            {menuItem.label}
          </Label>
        ))}
      </nav>
    </>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <>
      <div className="pt-12">
        <header className="fixed top-0 left-0 z-40 w-full backdrop-blur-md">
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            <Link to="/shop/home" className="flex items-center gap-2">
              <HousePlug className="w-6 h-6" />
              <span className="font-bold"> Casual-Store</span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Menu className="w-6 h-6" />
                  <span className="sr-only">Toggle header menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="w-full max-w-xs">
                <MenuItems />
                <HeaderRightContent />{" "}
              </SheetContent>
            </Sheet>

            <div className="hidden lg:block">
              <MenuItems />
            </div>
            <div className="hidden lg:block">
              <HeaderRightContent />{" "}
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default ShoppingHeader;
