import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "@/store/admin/users-slice";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const AdminUsersView = () => {
  const { users } = useSelector((state) => state.userAdmin);
  const { toast } = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // for deleted All users

  const deleteUsers = async (id) => {
    try {
      const res = await axios.delete(
        `https://zylomart-3bzq.onrender.com/api/admin/users/${id}`
      );
      toast({ title: res.data.message });
      dispatch(fetchAllUsers());
    } catch (error) {
      toast({ title: "Deleted Failed", message: error.message });
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
      </div>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Password</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>User Id</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user, index) => (
                <TableRow key={user?._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user?.userName || "No Name"}</TableCell>
                  <TableCell>{user?.email || "No Email"}</TableCell>
                  <TableCell>{user.password.slice(0, 10)}...</TableCell>
                  <TableCell>
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "--"}
                  </TableCell>
                  <TableCell>
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "N/A"}{" "}
                  </TableCell>
                  <TableCell>{user?._id || "No Id"}</TableCell>
                  <TableCell
                    className="cursor-pointer"
                    onClick={() => deleteUsers(user?._id)}
                  >
                    <X />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminUsersView;

// this code tan stack

// import { useToast } from "@/hooks/use-toast";
// import { fetchsUsersDataForAdmin } from "@/TanStackQuery/API/api";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// // ✅ Fix: rename icon to avoid clash
// import { Table as TableIcon, X } from "lucide-react";

// // ✅ Use your UI Table components
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";

// const Users = () => {
//   const queryClient = useQueryClient();
//   const { toast } = useToast();

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["admin-users"],
//     queryFn: fetchsUsersDataForAdmin,
//   });

//   const users = data?.users || [];

//   const deleteUsers = async (id) => {
//     try {
//       const res = await axios.delete(
//         `https://zylomart-3bzq.onrender.com/api/admin/users/${id}`
//       );
//       toast({ title: res.data.message });
//       queryClient.invalidateQueries(["users"]);
//     } catch (error) {
//       toast({ title: "Delete Failed", description: error.message });
//     }
//   };

//   return (
//     <Card>
//       <div className="flex items-center justify-between">
//         <CardHeader>
//           <CardTitle>All Users</CardTitle>
//         </CardHeader>
//         <div className="mr-6 mt-4">
//           {/* <TableIcon className="w-6 h-6" /> */}
//         </div>
//       </div>

//       <CardContent>
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : isError ? (
//           <p>{error.message}</p>
//         ) : (
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>S.No</TableHead>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Email</TableHead>
//                 <TableHead>Password</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Time</TableHead>
//                 <TableHead>User Id</TableHead>
//                 <TableHead>
//                   <span className="sr-only">Delete</span>
//                 </TableHead>
//               </TableRow>
//             </TableHeader>

//             <TableBody>
//               {Array.isArray(users) && users.length > 0 ? (
//                 users.map((user, index) => (
//                   <TableRow key={user?._id}>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{user?.userName || "No Name"}</TableCell>
//                     <TableCell>{user?.email || "No Email"}</TableCell>
//                     <TableCell>{user?.password?.slice(0, 10)}...</TableCell>
//                     <TableCell>
//                       {user?.createdAt
//                         ? new Date(user.createdAt).toLocaleDateString()
//                         : "--"}
//                     </TableCell>
//                     <TableCell>
//                       {user?.createdAt
//                         ? new Date(user.createdAt).toLocaleTimeString("en-IN", {
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })
//                         : "N/A"}
//                     </TableCell>
//                     <TableCell>{user?._id || "No Id"}</TableCell>
//                     <TableCell
//                       className="cursor-pointer text-red-500"
//                       onClick={() => deleteUsers(user?._id)}
//                     >
//                       <X />
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={8} className="text-center">
//                     No users found
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default Users;
