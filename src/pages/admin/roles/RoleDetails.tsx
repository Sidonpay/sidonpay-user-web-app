// pages/admin/roles/RoleDetails.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { mockRolesApi } from "../../../api/mockRolesApi";
import type { Role } from "../../../types/role";

export default function RoleDetails() {
  const { roleId } = useParams();
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    if (roleId) mockRolesApi.get(roleId).then(setRole);
  }, [roleId]);

  if (!role) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold">{role.name}</h1>
      <p className="mt-2">{role.description}</p>
      <p className="mt-2 font-semibold">Status: {role.isActive ? "Active" : "Disabled"}</p>

      <div className="mt-4 space-x-2">
        <Link to="edit" className="px-4 py-2 bg-yellow-500 text-white rounded">Edit</Link>
        <button
          onClick={() => mockRolesApi.toggleStatus(role.id).then(setRole)}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          {role.isActive ? "Disable" : "Enable"}
        </button>
      </div>
    </div>
  );
}