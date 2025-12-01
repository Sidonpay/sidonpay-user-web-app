import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockRolesApi } from "../../../api/mockRolesApi";

const RoleForm = () => {
  const { roleId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
  });

  useEffect(() => {
    if (roleId) {
      mockRolesApi.get(roleId).then((role) => {
        if (role) {
          setForm({ name: role.name });
        }
      });
    }
  }, [roleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (roleId) {
      await mockRolesApi.update(roleId, { name: form.name });
    } else {
      await mockRolesApi.create({ name: form.name });
    }

    navigate("/admin/roles");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{roleId ? "Edit Role" : "Create Role"}</h2>

      <input
        placeholder="Role name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <br />
      <button type="submit">Save</button>
    </form>
  );
};

export default RoleForm;
