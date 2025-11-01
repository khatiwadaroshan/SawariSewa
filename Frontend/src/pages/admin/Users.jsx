import React, { useEffect, useState } from "react";

import { instance } from "@/lib/axios";

const Users = () => {
  const [users, setusers] = useState([]);


  const getUsers = async () => {
    try {
      const res = await instance.get("/admin/users");
      console.log("All users:", res.data);
      setusers(res.data);
    } catch (err) {
      console.error(
        "Failed to fetch users:",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    getUsers();
  }, []);


  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((u) => (
              <tr key={u._id}>
                <td className="border px-4 py-2">{u.fullname}</td>
                <td className="border px-4 py-2">{u.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center py-4">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
