import type { User } from "../types/user";

let users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@gmail.com",
    role: { id: "r1", name: "admin" },
    isActive: true,
  },
  {
    id: "2",
    name: "Sarah Smith",
    email: "sarah@gmail.com",
    role: { id: "r2", name: "user" },
    isActive: false,
  },
];

export const mockUsersApi = {
  getUsers: async (): Promise<User[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(users), 400));
  },

  getUserById: async (id: string): Promise<User | undefined> => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(users.find((u) => u.id === id)), 400)
    );
  },

  createUser: async (user: User): Promise<User> => {
    users.push(user);
    return user;
  },

  updateUser: async (id: string, data: Partial<User>): Promise<User | undefined> => {
    users = users.map((u) => (u.id === id ? { ...u, ...data } : u));
    return users.find((u) => u.id === id);
  },

  toggleStatus: async (id: string): Promise<User> => {
    users = users.map((u) =>
      u.id === id ? { ...u, isActive: !u.isActive } : u
    );

    const updated = users.find((u) => u.id === id);

    if (!updated) {
      throw new Error("User not found");
    }

    return updated;
  },
};
