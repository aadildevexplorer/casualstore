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
function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrders);
  const [removeOrders, setRemoveOrders] = useState([]);
  const { toast } = useToast();
  const dispatch = useDispatch();

  const handleDelete = () => {
    toast({
      title: "Orders Deleted",
    });
  };

  // for delete Orders
  useEffect(() => {
    if (Array.isArray(orderList)) {
      const deleteId = JSON.parse(localStorage.getItem("deleteOrders") || "[]");
      const remainingOrders = orderList.filter(
        (order) => !deleteId.includes(order?._id)
      );
      setRemoveOrders(remainingOrders);
    }
  }, [orderList]);

  const deleteOrders = (id) => {
    // 1. Update localStorage
    const deletedId = JSON.parse(localStorage.getItem("deleteOrders") || "[]");
    if (!deletedId.includes(id)) {
      deletedId.push(id);
      localStorage.setItem("deleteOrders", JSON.stringify(deletedId));
    }

    // 2. Update local state
    setRemoveOrders((prev) => prev.filter((order) => order._id !== id));
  };

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

  return (
    <>
      <Card>
        <div className="flex items-center justify-between">
          <CardHeader>
            <CardTitle>All Orders</CardTitle>
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
              {Array.isArray(removeOrders) && removeOrders.length > 0 ? (
                removeOrders.map((orderItem, index) => (
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
                      onClick={() => {
                        handleDelete(), deleteOrders(orderItem?._id);
                      }}
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
