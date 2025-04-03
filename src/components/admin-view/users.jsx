// import React, { useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import { Badge } from "../ui/badge";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllUsers } from "@/store/admin/users-slice";

// const AdminUsersView = () => {
//   const { users } = useSelector((state) => state.userAdmin);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(fetchAllUsers());
//   }, [dispatch]);
//   console.log("Is Array:", Array.isArray(users));
//   useEffect(() => {
//     console.log("Updated Users in UI:", users);
//   }, [users]);

//   const forceUpdate = React.useReducer(() => ({}), {})[1];

//   useEffect(() => {
//     forceUpdate();
//   }, [users]);

//   // console.log("UI Users Data:", users);

//   return (
//     <Card>
//       <div className="flex items-center justify-between">
//         <CardHeader>
//           <CardTitle>All users</CardTitle>
//         </CardHeader>
//       </div>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Name</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>Password</TableHead>
//               <TableHead>Date</TableHead>
//               <TableHead>Time</TableHead>
//               <TableHead>
//                 <span className="sr-only">Details</span>
//               </TableHead>
//             </TableRow>
//           </TableHeader>
//           {/* <TableBody>
//             {users && users.length > 0 ? (
//               users.map((user, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{user.name}</TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>
//                     <Badge className="py-1 px-3 bg-black">--</Badge>
//                   </TableCell>
//                   <TableCell>$--</TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={6} className="text-center">
//                   No users found
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody> */}

//           <TableBody>
//             {Array.isArray(users) && users.length > 0 ? (
//               users.map((user, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{Array?.name || "No Name"}</TableCell>
//                   <TableCell>{user?.email || "No Email"}</TableCell>
//                   <TableCell>
//                     <Badge className="py-1 px-3 bg-black">--</Badge>
//                   </TableCell>
//                   <TableCell>
//                     {user?.createdAt
//                       ? new Date(user.createdAt).toLocaleDateString()
//                       : "--"}
//                   </TableCell>
//                   <TableCell>
//                     {user?.createdAt
//                       ? new Date(user.createdAt).toLocaleTimeString()
//                       : "--"}
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={6} className="text-center">
//                   No users found
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// };

// export default AdminUsersView;

import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "@/store/admin/users-slice";

const AdminUsersView = () => {
  const { users } = useSelector((state) => state.userAdmin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // console.log("Is Array:", Array.isArray(users));
  // useEffect(() => {
  //   console.log("Updated Users in UI:", users);
  // }, [users]);

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
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user?.userName || "No Name"}</TableCell>
                  <TableCell>{user?.email || "No Email"}</TableCell>
                  <TableCell> {user.password} </TableCell>
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
