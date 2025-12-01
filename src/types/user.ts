export interface Role {
  id: string;
  name: string; // "admin", "user", "superadmin"
}

export interface User {
  id: string;        // mock API uses string IDs
  name: string;
  email: string;
  role: Role;        // must match your mock role
  isActive: boolean;
}
