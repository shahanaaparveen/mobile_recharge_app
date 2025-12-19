import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

const Admin = () => {
  const [stats, setStats] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [plans] = useState([
    { id: 1, operator: 'Airtel', amount: 199, validity: '28 days', data: '1GB/day' },
    { id: 2, operator: 'Jio', amount: 299, validity: '56 days', data: '2GB/day' },
    { id: 3, operator: 'Vi', amount: 399, validity: '84 days', data: '1.5GB/day' },
    { id: 4, operator: 'BSNL', amount: 149, validity: '30 days', data: '1GB/day' }
  ]);

  useEffect(() => {
    fetchStats();
    fetchTransactions();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/stats`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/transactions`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Admin Dashboard</h1>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <i className="fas fa-users text-blue-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalUsers || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <i className="fas fa-exchange-alt text-green-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Transactions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalTransactions || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <i className="fas fa-rupee-sign text-yellow-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Revenue</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{stats.totalRevenue || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
                <i className="fas fa-chart-line text-red-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.successRate || 0}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Plans Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recharge Plans</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 text-gray-600 dark:text-gray-400">ID</th>
                    <th className="text-left py-3 text-gray-600 dark:text-gray-400">Operator</th>
                    <th className="text-left py-3 text-gray-600 dark:text-gray-400">Amount</th>
                    <th className="text-left py-3 text-gray-600 dark:text-gray-400">Validity</th>
                    <th className="text-left py-3 text-gray-600 dark:text-gray-400">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan) => (
                    <tr key={plan.id} className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 text-gray-900 dark:text-white">{plan.id}</td>
                      <td className="py-3 text-gray-900 dark:text-white">{plan.operator}</td>
                      <td className="py-3 text-gray-900 dark:text-white">₹{plan.amount}</td>
                      <td className="py-3 text-gray-900 dark:text-white">{plan.validity}</td>
                      <td className="py-3 text-gray-900 dark:text-white">{plan.data}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Transactions</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 text-gray-600 dark:text-gray-400">Transaction ID</th>
                    <th className="text-left py-3 text-gray-600 dark:text-gray-400">Phone</th>
                    <th className="text-left py-3 text-gray-600 dark:text-gray-400">Operator</th>
                    <th className="text-left py-3 text-gray-600 dark:text-gray-400">Amount</th>
                    <th className="text-left py-3 text-gray-600 dark:text-gray-400">Status</th>
                    <th className="text-left py-3 text-gray-600 dark:text-gray-400">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction._id} className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 text-gray-900 dark:text-white font-mono text-sm">
                        {transaction.transactionId}
                      </td>
                      <td className="py-3 text-gray-900 dark:text-white">{transaction.phone}</td>
                      <td className="py-3 text-gray-900 dark:text-white">{transaction.operator}</td>
                      <td className="py-3 text-gray-900 dark:text-white">₹{transaction.amount}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          transaction.status === 'success' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="py-3 text-gray-900 dark:text-white">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;