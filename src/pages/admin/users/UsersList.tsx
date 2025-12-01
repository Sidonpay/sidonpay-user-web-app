import { useEffect, useState } from "react";
import { mockUsersApi } from "../../../api/mockUsersApi";
import type { User } from "../../../types/user";
import { Link } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockUsersApi.getUsers().then((res) => {
      setUsers(res);
      setLoading(false);
    });
  }, []);

  const handleToggleStatus = async (id: string) => {
    try {
      const updatedUser: User = await mockUsersApi.toggleStatus(id);

      setUsers((prev) =>
        prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  if (loading) {
    return <p className="text-center text-lg font-medium">Loading users...</p>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Users</h2>
        <Link
          to="/admin/users/create"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Create User
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-left">Name</th>
              <th className="border p-3 text-left">Email</th>
              <th className="border p-3 text-left">Role</th>
              <th className="border p-3 text-left">Status</th>
              <th className="border p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border p-3">
                  <Link
                    to={`/admin/users/${user.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {user.name}
                  </Link>
                </td>

                <td className="border p-3">{user.email}</td>
                <td className="border p-3 capitalize">{user.role.name}</td>

                <td className="border p-3">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      user.isActive ? "bg-green-600" : "bg-gray-500"
                    }`}
                  >
                    {user.isActive ? "Active" : "Disabled"}
                  </span>
                </td>

                <td className="border p-3 space-x-3">
                  <Link
                    to={`/admin/users/edit/${user.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleToggleStatus(user.id)}
                    className={`px-3 py-1 rounded text-white text-sm ${
                      user.isActive ? "bg-red-600" : "bg-green-600"
                    }`}
                  >
                    {user.isActive ? "Disable" : "Enable"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
