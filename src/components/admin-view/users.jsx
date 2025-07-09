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

const AdminUsersView = () => {
  const { users } = useSelector((state) => state.userAdmin);
  const [removeUsers, setRemoveUsers] = useState([]);
  const { toast } = useToast();
  const dispatch = useDispatch();

  const handleDelete = () => {
    toast({
      title: "Users Deleted",
    });
  };

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // for delete Users
  useEffect(() => {
    if (Array.isArray(users)) {
      const deleteId = JSON.parse(localStorage.getItem("deleteUsers") || "[]");
      const remainingUsers = users.filter(
        (user) => !deleteId.includes(user?._id)
      );
      setRemoveUsers(remainingUsers);
    }
  }, [users]);

  const deleteUsers = (id) => {
    // 1. Update localStorage
    const deletedId = JSON.parse(localStorage.getItem("deleteUsers") || "[]");
    if (!deletedId.includes(id)) {
      deletedId.push(id);
      localStorage.setItem("deleteUsers", JSON.stringify(deletedId));
    }

    // 2. Update local state
    setRemoveUsers((prev) => prev.filter((user) => user._id !== id));
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
            {Array.isArray(removeUsers) && removeUsers.length > 0 ? (
              removeUsers.map((user, index) => (
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
                    onClick={() => {
                      handleDelete(), deleteUsers(user?._id);
                    }}
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
