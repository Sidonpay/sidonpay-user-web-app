import React from "react";

const UserDashboard: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-4">Welcome to your Dashboard</h1>

      <p className="text-gray-700 mb-6">
        This is your personal user dashboard. 
        You can access your wallet, transactions, profile and other features here.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Card 1 */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">My Wallet</h2>
          <p className="text-gray-600 text-sm">
            View your balance and manage your wallet.
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Transactions</h2>
          <p className="text-gray-600 text-sm">
            Track your recent payments and activity.
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Profile Settings</h2>
          <p className="text-gray-600 text-sm">
            Update your personal information.
          </p>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
