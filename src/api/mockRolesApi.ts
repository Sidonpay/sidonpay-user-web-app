import type { Role } from "../types/role";
import { v4 as uuid } from "uuid";

let roles: Role[] = [
  { id: "r1", name: "user", isActive: true, description: "Standard user role" },
  { id: "r2", name: "admin", isActive: true, description: "Administrator role" },
  { id: "r3", name: "super-admin", isActive: true, description: "Super Administrator role" },
];

export const mockRolesApi = {
  list: async () => roles,

  get: async (id: string) => roles.find((r) => r.id === id) || null,

  create: async (payload: Omit<Role, "id">) => {
    const newRole: Role = { id: uuid(), ...payload };
    roles.push(newRole);
    return newRole;
  },

  update: async (id: string, payload: Partial<Role>) => {
    roles = roles.map((r) => (r.id === id ? { ...r, ...payload } : r));
    return roles.find((r) => r.id === id);
  },

  delete: async (id: string) => {
    roles = roles.filter((r) => r.id !== id);
    return true;
  },

  toggleStatus: async (id: string) => {
    const role = roles.find((r) => r.id === id);
    if (role) {
      role.isActive = !role.isActive;
      return role;
    }
    return null;
  },
};

