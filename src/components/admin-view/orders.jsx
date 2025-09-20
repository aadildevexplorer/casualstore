import { Dialog } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useEffect, useState } from "react";
import AdminOrdersDetailsView from "./orders-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";
import axios from "axios";
import ButtonCSV from "../common/CSV/Data";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrders);
  const { toast } = useToast();
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    dispatch(getOrderDetailsForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  // for delete All Orders
  const deletedAllOrders = async (id) => {
    try {
      const res = await axios.delete(
        `https://zylomart-3bzq.onrender.com/api/admin/orders/${id}`
      );
      toast({ title: res.data.message });
      dispatch(getAllOrdersForAdmin());
    } catch (error) {
      toast({ title: "Deleted Failed", message: error.message });
    }
  };

  return (
    <>
      <Card>
        <div className="flex items-center justify-between">
          <CardHeader>
            <CardTitle>All Orders</CardTitle>
          </CardHeader>

          <CardHeader>
            <CardTitle>
              <ButtonCSV data={orderList} type="orders" />
            </CardTitle>
          </CardHeader>
        </div>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S.No</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead>View Details</TableHead>
                <TableHead>
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(orderList) && orderList.length > 0 ? (
                orderList.map((orderItem, index) => (
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-black"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>${orderItem?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          className="mr-7"
                          onClick={() =>
                            handleFetchOrderDetails(orderItem?._id)
                          }
                        >
                          View Details
                        </Button>

                        <AdminOrdersDetailsView orderDetails={orderDetails} />
                        {/* <ShoppingOrderDetailsView
                          />  */}
                      </Dialog>
                    </TableCell>

                    <TableCell
                      className="cursor-pointer"
                      onClick={() => deletedAllOrders(orderItem?._id)}
                    >
                      <X />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>{" "}
    </>
  );
}

export default AdminOrdersView;

// this code tan stack
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { Badge } from "../ui/badge";
// import { Dialog } from "@radix-ui/react-dialog";
// import { Button } from "../ui/button";
// import { useToast } from "@/hooks/use-toast";
// import { X } from "lucide-react";
// import AdminOrdersDetailsView from "./orders-details";
// import { useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import {
//   getOrderDetailsForAdmin,
//   resetOrderDetails,
// } from "@/store/admin/order-slice";
// import { useQuery } from "@tanstack/react-query";
// import { fetchsUsersOrderForAdmin } from "@/TanStackQuery/API/api";

// function AdminOrdersView() {
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//   const dispatch = useDispatch();
//   const { toast } = useToast();

//   const {
//     data,
//     isLoading,
//     isError,
//     refetch: refetchOrders,
//   } = useQuery({
//     queryKey: ["admin-orders"],
//     queryFn: fetchsUsersOrderForAdmin,
//   });

// const orderList = Array.isArray(data?.data) ? data.data : [];

//   const handleFetchOrderDetails = (id) => {
//     dispatch(getOrderDetailsForAdmin(id));
//     setOpenDetailsDialog(true);
//   };

//   const deletedAllOrders = async (id) => {
//     try {
//       const res = await axios.delete(
//         `https://zylomart-3bzq.onrender.com/api/admin/orders/${id}`
//       );
//       toast({ title: res.data.message });
//       refetchOrders();
//     } catch (error) {
//       toast({ title: "Delete Failed", description: error.message });
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="py-6 text-lg font-medium text-center text-gray-600">
//         Loading orders...
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="py-6 font-medium text-center text-red-600">
//         Failed to fetch orders.
//       </div>
//     );
//   }

//   return (
//     <Card>
//       <div className="flex items-center justify-between">
//         <CardHeader>
//           <CardTitle>All Orders</CardTitle>
//         </CardHeader>
//       </div>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>S.No</TableHead>
//               <TableHead>Order ID</TableHead>
//               <TableHead>Order Date</TableHead>
//               <TableHead>Order Status</TableHead>
//               <TableHead>Order Price</TableHead>
//               <TableHead>View Details</TableHead>
//               <TableHead>
//                 <span className="sr-only">Delete</span>
//               </TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {orderList.length > 0 ? (
//               orderList.map((orderItem, index) => (
//                 <TableRow key={orderItem?._id}>
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell>{orderItem?._id}</TableCell>
//                   <TableCell>
//                     {orderItem?.orderDate?.split("T")[0] || "--"}
//                   </TableCell>
//                   <TableCell>
//                     <Badge
//                       className={`py-1 px-3 ${
//                         orderItem?.orderStatus === "confirmed"
//                           ? "bg-green-500"
//                           : orderItem?.orderStatus === "rejected"
//                           ? "bg-red-600"
//                           : "bg-black"
//                       }`}
//                     >
//                       {orderItem?.orderStatus}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>${orderItem?.totalAmount}</TableCell>
//                   <TableCell>
//                     <Dialog
//                       open={openDetailsDialog}
//                       onOpenChange={(isOpen) => {
//                         setOpenDetailsDialog(isOpen);
//                         if (!isOpen) dispatch(resetOrderDetails());
//                       }}
//                     >
//                       <Button
//                         className="mr-7"
//                         onClick={() => handleFetchOrderDetails(orderItem?._id)}
//                       >
//                         View Details
//                       </Button>
//                       <AdminOrdersDetailsView />
//                     </Dialog>
//                   </TableCell>
//                   <TableCell
//                     className="text-red-600 cursor-pointer"
//                     onClick={() => deletedAllOrders(orderItem?._id)}
//                   >
//                     <X />
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={7} className="text-center">
//                   No orders found
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// }

// export default AdminOrdersView;
