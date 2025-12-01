import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { mockUsersApi } from "../../../api/mockUsersApi";
import type { User } from "../../../types/user";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    if (id) {
      mockUsersApi.getUserById(id).then(setUser);
    }
  }, [id]);

  if (!user)
    return (
      <div className="flex justify-center items-center h-64 text-lg font-semibold">
        Loading user...
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>

        <Link
          to="/admin/users"
          className="text-sm px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
        >
          ← Back
        </Link>
      </div>

      {/* User Info */}
      <div className="space-y-4">
        <div>
          <p className="text-gray-500 text-sm">Email</p>
          <p className="text-lg font-medium">{user.email}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Role</p>
          <p
            className={`inline-block mt-1 px-3 py-1 rounded-full text-white text-sm ${
              user.role.name === "admin"
                ? "bg-blue-600"
                : user.role.name === "superadmin"
                ? "bg-purple-600"
                : "bg-green-600"
            }`}
          >
            {user.role.name}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Status</p>
          <p
            className={`inline-block mt-1 px-3 py-1 rounded-full text-white text-sm ${
              user.isActive ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {user.isActive ? "Active" : "Disabled"}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex gap-4">
        <Link
          to={`/admin/users/edit/${user.id}`}
          className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          Edit User
        </Link>

        <button
          className={`px-5 py-2 rounded-md text-white transition ${
            user.isActive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {user.isActive ? "Disable User" : "Enable User"}
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
