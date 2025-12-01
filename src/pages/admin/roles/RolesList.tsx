import { useEffect, useState } from "react";
import { mockRolesApi } from "../../../api/mockRolesApi";
import type { Role } from "../../../types/role";
import { Link } from "react-router-dom";

export default function RolesList() {
  const [data, setData] = useState<Role[]>([]);

  useEffect(() => {
    mockRolesApi.list().then(setData);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Roles</h1>
      <Link to="create" className="px-4 py-2 bg-blue-600 text-white rounded">Create Role</Link>

      <table className="w-full mt-4 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(r => (
            <tr key={r.id}>
              <td className="p-2 border">{r.name}</td>
              <td className="p-2 border">{r.isActive ? "Active" : "Disabled"}</td>
              <td className="p-2 border space-x-2">
                <Link to={r.id} className="text-blue-600">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}