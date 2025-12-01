import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = {
    totalUsers: 128,
    activeUsers: 102,
    admins: 4,
    disputes: 6,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">

        {/* Sidebar */}
        <aside className="w-64 bg-white border-r hidden md:flex flex-col">
          <div className="px-6 py-6 border-b">
            <div className="text-2xl font-bold text-slate-800">SidonPay</div>
            <div className="text-xs text-slate-500 mt-1">Admin panel</div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 flex items-center gap-3 text-sm font-medium text-slate-700"
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/admin/users")}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 flex items-center gap-3 text-sm font-medium text-slate-700"
            >
              Users
            </button>

            <button
              onClick={() => navigate("/admin/roles")}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 flex items-center gap-3 text-sm font-medium text-slate-700"
            >
              Roles
            </button>

            <button
              onClick={() => navigate("/admin/reports")}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-50 flex items-center gap-3 text-sm font-medium text-slate-700"
            >
              Reports
            </button>
          </nav>

          <div className="px-4 py-4 border-t">
            <div className="text-xs text-slate-500">Signed in as</div>
            <div className="mt-2 text-sm font-medium text-slate-800">{user?.name}</div>
            <div className="text-xs text-slate-500">{user?.email}</div>
          </div>
        </aside>

        {/* Main area */}
        <div className="flex-1 min-h-screen">
          {/* Top bar */}
          <header className="flex items-center justify-between px-4 py-4 border-b bg-white">
            <div className="flex items-center gap-4">
              {/* Mobile menu button placeholder */}
              <button
                className="md:hidden p-2 rounded-md hover:bg-gray-50"
                aria-label="open menu"
                onClick={() => {
                }}
              >
                <svg className="w-6 h-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <h1 className="text-xl font-semibold text-slate-800">Admin Dashboard</h1>
              <div className="text-sm text-slate-500 ml-4 hidden sm:inline">Overview of system activity</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-slate-600">Hello, <span className="font-medium text-slate-800">{user?.name}</span></div>

              <button
                onClick={() => navigate("/admin/users/create")}
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-3 py-2 rounded"
              >
                + Create User
              </button>
            </div>
          </header>

          {/* Content */}
          <main className="p-6">
            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Total Users" value={stats.totalUsers} />
              <StatCard title="Active Users" value={stats.activeUsers} />
              <StatCard title="Admins" value={stats.admins} />
              <StatCard title="Disputes" value={stats.disputes} />
            </div>

            {/* Quick actions & table */}
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Actions */}
              <div className="lg:col-span-1 bg-white p-4 rounded shadow">
                <h3 className="text-sm font-semibold text-slate-800 mb-3">Quick actions</h3>
                <div className="space-y-2">
                  <button
                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-50"
                    onClick={() => navigate("/admin/users")}
                  >
                    Manage Users
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-50"
                    onClick={() => navigate("/admin/roles")}
                  >
                    Manage Roles
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-50"
                    onClick={() => navigate("/admin/reports")}
                  >
                    View Reports
                  </button>
                </div>
              </div>

              {/* Recent users list (placeholder) */}
              <div className="lg:col-span-2 bg-white p-4 rounded shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-slate-800">Recent users</h3>
                  <button
                    onClick={() => navigate("/admin/users")}
                    className="text-sm text-blue-600"
                  >
                    View all
                  </button>
                </div>

                <RecentUsersTable />
              </div>
            </div>

            {/* Footer / notes */}
            </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

/* --------------------- */
/* Subcomponents         */
/* --------------------- */

const StatCard: React.FC<{ title: string; value: number | string }> = ({ title, value }) => (
  <div className="bg-white p-4 rounded shadow flex flex-col">
    <div className="text-sm text-slate-500">{title}</div>
    <div className="mt-2 text-2xl font-semibold text-slate-800">{value}</div>
  </div>
);

const RecentUsersTable: React.FC = () => {
  const rows = [
    { id: "1", name: "John Doe", email: "john@example.com", status: "Active" },
    { id: "2", name: "Sarah Smith", email: "sarah@example.com", status: "Disabled" },
    { id: "3", name: "Ali Khan", email: "ali@example.com", status: "Active" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left">
            <th className="pb-2 text-slate-500">Name</th>
            <th className="pb-2 text-slate-500">Email</th>
            <th className="pb-2 text-slate-500 hidden sm:table-cell">Status</th>
            <th className="pb-2 text-slate-500 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t">
              <td className="py-3">{r.name}</td>
              <td className="py-3 text-slate-600">{r.email}</td>
              <td className="py-3 hidden sm:table-cell">
                <span className={`px-2 py-1 text-xs rounded ${r.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-slate-600"}`}>
                  {r.status}
                </span>
              </td>
              <td className="py-3 text-right">
                <button
                  onClick={() => {}}
                  className="text-sm text-blue-600"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
