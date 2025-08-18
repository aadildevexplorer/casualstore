"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { X } from "lucide-react";

export default function AdminCookie() {
  // API call
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cookies"],
    queryFn: async () => {
      const res = await axios.get(
        "https://zylomart-3bzq.onrender.com/api/admin/cookies/getCookie"
      );
      return res.data;
    },
  });

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (isError) return <p className="p-4 text-red-500">{error.message}</p>;

  return (
    <Card>
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle>All Cookies</CardTitle>
        </CardHeader>
      </div>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No</TableHead>
              <TableHead>Consent</TableHead>
              <TableHead>IP</TableHead>
              <TableHead>User Agent</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Cookie Id</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data && data.length > 0 ? (
              data.map((cookie, idx) => (
                <TableRow key={cookie._id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell
                    className={`font-medium ${
                      cookie.consent === "all"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {cookie.consent || "N/A"}
                  </TableCell>
                  <TableCell>{cookie.ip || "N/A"}</TableCell>
                  <TableCell className="truncate max-w-xs">
                    {cookie.userAgent.slice(0, 10) || "N/A"}
                  </TableCell>
                  <TableCell>
                    {cookie.createdAt
                      ? new Date(cookie.createdAt).toLocaleDateString()
                      : "--"}
                  </TableCell>
                  <TableCell>
                    {cookie.createdAt
                      ? new Date(cookie.createdAt).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "N/A"}
                  </TableCell>
                  <TableCell>{cookie._id || "No Id"}</TableCell>
                  <TableCell className="cursor-pointer">
                    <X />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No cookies found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
