import type { Role } from "../types/user";
import { v4 as uuid } from "uuid";

let roles: Role[] = [
  { id: "r1", name: "user" },
  { id: "r2", name: "admin" },
  { id: "r3", name: "super-admin" },
];

export const mockRolesApi = {
  list: async () => roles,

  get: async (id: string) => roles.find((r) => r.id === id),

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
};
