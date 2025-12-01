import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockUsersApi } from "../../../api/mockUsersApi";
import type { User } from "../../../types/user";
import { v4 as uuid } from "uuid";

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  interface UserFormState {
    name: string;
    email: string;
    role: User["role"]["name"];
  }

  const [form, setForm] = useState<UserFormState>({
    name: "",
    email: "",
    role: "user",
  });

  useEffect(() => {
    if (id) {
      mockUsersApi.getUserById(id).then((u) => {
        if (u) {
          setForm({
            name: u.name,
            email: u.email,
            role: u.role.name,
          });
        }
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (id) {
      await mockUsersApi.updateUser(id, {
        name: form.name,
        email: form.email,
        role: { id: "r1", name: form.role },
      });
    } else {
      await mockUsersApi.createUser({
        id: uuid(),
        name: form.name,
        email: form.email,
        role: { id: "r1", name: form.role },
        isActive: true,
      });
    }

    navigate("/admin/users");
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">
        {id ? "Edit User" : "Create User"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5 ">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            placeholder="Enter full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="super-admin">Super Admin</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md text-center font-medium hover:bg-green-700 transition"
        >
          Save User
        </button>
      </form>
    </div>
  );
};

export default UserForm;
