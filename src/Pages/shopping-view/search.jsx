// import ProductDetailsDialog from "@/components/shopping-view/product-details";
// import ShoppingProductTile from "@/components/shopping-view/product-tile";
// import { Input } from "@/components/ui/input";
// import { toast } from "@/hooks/use-toast";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
// import { fetchProductDetails } from "@/store/shop/product-slice";
// import {
//   getSearchResults,
//   resetSearchResults,
// } from "@/store/shop/search-slice";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";

// function SearchProducts({ handleAddtoCart, handleGetProductDetails }) {
//   const [keyword, setKeyword] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const { searchResults } = useSelector((state) => state.shopSearch);
//   const { productDetails } = useSelector((state) => state.shopProducts);
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { user } = useSelector((state) => state.auth);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
//       setTimeout(() => {
//         setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
//         dispatch(getSearchResults(keyword));
//       }, 1000);
//     } else {
//       setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
//       dispatch(resetSearchResults());
//     }
//   }, [keyword]);

//   function handleAddtoCart(getCurrentProductId, getTotalStock) {
//     let getCartItems = cartItems.items || [];

//     if (getCartItems.length) {
//       const indexOfCurrentItem = getCartItems.findIndex(
//         (item) => item.productId === getCurrentProductId
//       );
//       if (indexOfCurrentItem > -1) {
//         const getQuantity = getCartItems[indexOfCurrentItem].quantity;
//         if (getQuantity + 1 > getTotalStock) {
//           toast({
//             title: `Only ${getQuantity} quantity can be added for this item`,
//             variant: "destructive",
//           });

//           return;
//         }
//       }
//     }

//     dispatch(
//       addToCart({
//         userId: user?.id,
//         productId: getCurrentProductId,
//         quantity: 1,
//       })
//     ).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchCartItems(user?.id));
//         toast({
//           title: "Product is added to cart",
//         });
//       }
//     });
//   }

//   useEffect(() => {
//     if (productDetails !== null) setOpenDetailsDialog(true);
//   }, [productDetails]);

//   function handleGetProductDetails(getCurrentProductId) {
//     dispatch(fetchProductDetails(getCurrentProductId));
//   }

//   useEffect(() => {
//     if (searchTerm && searchTerm.length > 3) {
//       dispatch(getSearchResults(searchTerm));
//     } else {
//       dispatch(resetSearchResults());
//     }
//   }, [searchTerm]);

//   // debounce
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setSearchTerm(keyword);
//       setKeyword(""); // clear after dispatch
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, [keyword]);

//   return (
//     <>
//       <div className="container px-4 py-8 mx-auto md:px-6">
//         <div className="flex justify-center mb-8">
//           <div className="flex items-center w-full">
//             <Input
//               value={keyword}
//               name="keyword"
//               onChange={(event) => setKeyword(event.target.value)}
//               className="py-6"
//               placeholder="Search Products"
//             />
//           </div>
//         </div>
//         {!searchResults.length ? (
//           <h1 className="text-5xl font-extrabold">No result found!</h1>
//         ) : null}
//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {searchResults?.map((item) => (
//             <ShoppingProductTile
//               product={item}
//               handleGetProductDetails={handleGetProductDetails}
//               handleAddtoCart={handleAddtoCart}
//             />
//           ))}
//         </div>

//         <ProductDetailsDialog
//           open={openDetailsDialog}
//           setOpen={setOpenDetailsDialog}
//           productDetails={productDetails}
//         />
//       </div>
//     </>
//   );
// }

// export default SearchProducts;

import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/product-slice";
import {
  getSearchResults,
  resetSearchResults,
} from "@/store/shop/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function SearchProducts({ handleAddtoCart, handleGetProductDetails }) {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // 🔹 Reset results & input when page loads
  useEffect(() => {
    setKeyword("");
    dispatch(resetSearchResults());
    setSearchParams(new URLSearchParams(""));
  }, []);

  function handleSearch() {
    if (keyword.trim().length >= 3) {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(getSearchResults(keyword)).then(() => {
        setKeyword(""); // clear after search
      });
    } else {
      setSearchParams(new URLSearchParams(""));
      dispatch(resetSearchResults());
    }
  }

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  return (
    <>
      <div className="container px-4 py-8 mx-auto md:px-6">
        <div className="flex justify-center mb-8">
          <div className="flex items-center w-full gap-2">
            <Input
              value={keyword}
              name="keyword"
              type="text"
              onChange={(event) => setKeyword(event.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              className="py-6"
              placeholder="Search Products"
            />
          </div>
        </div>

        {Array.isArray(searchResults) &&
          searchResults.length === 0 &&
          !keyword && (
            <h1 className="text-5xl font-extrabold text-center">
              No data found!
            </h1>
          )}

        {Array.isArray(searchResults) && searchResults.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {searchResults.map((item) => (
              <ShoppingProductTile
                key={item.id}
                product={item}
                handleGetProductDetails={handleGetProductDetails}
                handleAddtoCart={handleAddtoCart}
              />
            ))}
          </div>
        )}

        <ProductDetailsDialog
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          productDetails={productDetails}
        />
      </div>
    </>
  );
}

export default SearchProducts;
