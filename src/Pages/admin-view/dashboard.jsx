import { Card, CardContent } from "@/components/ui/card";
import { getAllOrdersForAdmin } from "@/store/admin/order-slice";
import { fetchAllProduct } from "@/store/admin/products-Slice";
import { fetchAllUsers } from "@/store/admin/users-slice";
import {
  Users,
  ShoppingCart,
  BarChart,
  TrendingUp,
  Boxes,
  BadgeDollarSign,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AdminDashboard() {
  const { orderList } = useSelector((state) => state.adminOrders);
  const { users } = useSelector((state) => state.userAdmin);
  const { productsList } = useSelector((state) => state.adminProducts);

  const [totalSale, setTotalSale] = useState(0);

  const Sale = 149093;

  const formatted = Math.floor(totalSale / 10000) / 10 + "L";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(getAllOrdersForAdmin());
    dispatch(fetchAllProduct());
  }, [dispatch]);

  useEffect(() => {
    if (orderList && orderList.length > 0) {
      const total = orderList.reduce(
        (sum, order) => sum + (order.totalAmount || 0),
        0
      );
      setTotalSale(total);
    }
  }, [orderList]);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-gradient-to-br from-gray-100 to-gray-300 min-h-scree">
      {/* Orders */}
      <Card className="bg-white bg-opacity-90 shadow-md border border-gray-200 rounded-2xl hover:scale-[1.03] transition-transform duration-300">
        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
          <ShoppingCart size={50} className="text-blue-600 mb-3" />
          <p className="text-gray-500 text-sm uppercase tracking-wide">
            Orders
          </p>
          <p className="text-3xl font-bold text-gray-800">
            {orderList?.length || 0}
          </p>
        </CardContent>
      </Card>

      {/* Users */}
      <Card className="bg-white bg-opacity-90 shadow-md border border-gray-200 rounded-2xl hover:scale-[1.03] transition-transform duration-300">
        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
          <Users size={50} className="text-green-600 mb-3" />
          <p className="text-gray-500 text-sm uppercase tracking-wide">Users</p>
          <p className="text-3xl font-bold text-gray-800">
            {users?.length || 0}
          </p>
        </CardContent>
      </Card>

      {/* Revenue */}
      <Card className="bg-white bg-opacity-90 shadow-md border border-gray-200 rounded-2xl hover:scale-[1.03] transition-transform duration-300">
        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
          <BadgeDollarSign size={50} className="text-orange-600 mb-3" />
          <p className="text-gray-500 text-sm uppercase tracking-wide">
            Revenue
          </p>
          {/* <p className="text-3xl font-bold text-gray-800">
            ₹{Math.floor(totalSale / 10000) / 10}L
          </p> */}
          <p className="text-3xl font-bold text-gray-800">
            ₹{Math.floor(totalSale / 10000) / 10}L
          </p>
        </CardContent>
      </Card>

      {/* Products */}
      <Card className="bg-white bg-opacity-90 shadow-md border border-gray-200 rounded-2xl hover:scale-[1.03] transition-transform duration-300">
        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
          <Boxes size={50} className="text-red-600 mb-3" />
          <p className="text-gray-500 text-sm uppercase tracking-wide">
            Products
          </p>
          <p className="text-3xl font-bold text-gray-800">
            {productsList?.length || 0}
          </p>
        </CardContent>
      </Card>

      {/* Sales Analytics */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-4 bg-white bg-opacity-90 shadow-md border border-gray-200 rounded-2xl hover:scale-[1.02] transition-transform duration-300">
        <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="flex items-center gap-6">
            <BarChart size={50} className="text-blue-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Sales Analytics
              </h2>
              <p className="text-gray-600 text-sm">
                Detailed insights on revenue growth
              </p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <TrendingUp size={42} className="text-green-600" />
            <p className="text-xl font-bold text-green-700">+12% This Month</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
