import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

const Admin = () => {
  const [stats, setStats] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [plans, setPlans] = useState([]);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [planForm, setPlanForm] = useState({
    operator: '',
    amount: '',
    validity: '',
    data: '',
    description: ''
  });

  useEffect(() => {
    fetchStats();
    fetchTransactions();
    fetchPlans();
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

  const fetchPlans = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/plans`);
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      console.error('Failed to fetch plans:', error);
    }
  };

  const handlePlanSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingPlan 
        ? `${import.meta.env.VITE_API_URL}/api/admin/plans/${editingPlan._id}`
        : `${import.meta.env.VITE_API_URL}/api/admin/plans`;
      
      const method = editingPlan ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...planForm,
          amount: Number(planForm.amount)
        })
      });
      
      if (response.ok) {
        await fetchPlans();
        setShowPlanModal(false);
        setEditingPlan(null);
        setPlanForm({ operator: '', amount: '', validity: '', data: '', description: '' });
        alert(editingPlan ? 'Plan updated successfully!' : 'Plan created successfully!');
      } else {
        const error = await response.json();
        alert('Error: ' + (error.message || 'Failed to save plan'));
      }
    } catch (error) {
      console.error('Failed to save plan:', error);
      alert('Network error. Please try again.');
    }
  };

  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
    setPlanForm(plan);
    setShowPlanModal(true);
  };

  const handleDeletePlan = async (id) => {
    if (confirm('Are you sure you want to delete this plan?')) {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/api/admin/plans/${id}`, {
          method: 'DELETE'
        });
        fetchPlans();
      } catch (error) {
        console.error('Failed to delete plan:', error);
      }
    }
  };

  const BarChart = ({ data, title }) => {
    if (!data || data.length === 0) {
      return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <i className="fas fa-chart-bar text-4xl mb-4"></i>
            <p>No data available</p>
          </div>
        </div>
      );
    }
    const maxValue = Math.max(...data.map(d => d.value), 1);
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="w-20 text-sm text-gray-600 dark:text-gray-400">{item.label}</div>
              <div className="flex-1 mx-3">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${(item.value / maxValue) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-16 text-sm font-medium text-gray-900 dark:text-white text-right">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const LineChart = ({ data, title }) => {
    if (!data || data.length === 0) {
      return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <i className="fas fa-chart-line text-4xl mb-4"></i>
            <p>No data available</p>
          </div>
        </div>
      );
    }
    const maxValue = Math.max(...data.map(d => d.value), 1);
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
        <div className="h-40 flex items-end space-x-2">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-gradient-to-t from-green-500 to-green-300 rounded-t transition-all duration-500"
                style={{ height: `${(item.value / maxValue) * 120}px` }}
              ></div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-2 transform -rotate-45">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
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

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <BarChart 
            data={stats.operatorStats?.length > 0 
              ? stats.operatorStats.map(op => ({ label: op._id || 'Unknown', value: op.count || 0 }))
              : [{ label: 'Airtel', value: 5 }, { label: 'Jio', value: 8 }, { label: 'Vi', value: 3 }]
            }
            title="Transactions by Operator"
          />
          <LineChart 
            data={stats.dailyStats?.length > 0 
              ? stats.dailyStats.map(day => ({ label: day._id?.slice(-5) || 'N/A', value: day.count || 0 }))
              : [{ label: '12-15', value: 4 }, { label: '12-16', value: 7 }, { label: '12-17', value: 5 }, { label: '12-18', value: 9 }, { label: '12-19', value: 6 }]
            }
            title="Daily Transactions (Last 7 Days)"
          />
        </div>

        {/* Plans Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recharge Plans</h2>
            <button 
              onClick={() => setShowPlanModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <i className="fas fa-plus mr-2"></i>Add Plan
            </button>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 text-gray-600 dark:text-gray-400">Operator</th>
                    <th className="text-left py-3 text-gray-600 dark:text-gray-400">Amount</th>
                    <th className="text-left py-3 text-gray-600 dark:text-gray-400">Validity</th>
                    <th className="text-left py-3 text-gray-600 dark:text-gray-400">Data</th>
                    <th className="text-left py-3 text-gray-600 dark:text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan) => (
                    <tr key={plan._id} className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 text-gray-900 dark:text-white">{plan.operator}</td>
                      <td className="py-3 text-gray-900 dark:text-white">₹{plan.amount}</td>
                      <td className="py-3 text-gray-900 dark:text-white">{plan.validity}</td>
                      <td className="py-3 text-gray-900 dark:text-white">{plan.data}</td>
                      <td className="py-3">
                        <button 
                          onClick={() => handleEditPlan(plan)}
                          className="text-blue-600 hover:text-blue-800 mr-3"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button 
                          onClick={() => handleDeletePlan(plan._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
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

        {/* Plan Modal */}
        {showPlanModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {editingPlan ? 'Edit Plan' : 'Add New Plan'}
              </h3>
              <form onSubmit={handlePlanSubmit}>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Operator"
                    value={planForm.operator}
                    onChange={(e) => setPlanForm({...planForm, operator: e.target.value})}
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Amount"
                    value={planForm.amount}
                    onChange={(e) => setPlanForm({...planForm, amount: e.target.value})}
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Validity (e.g., 28 days)"
                    value={planForm.validity}
                    onChange={(e) => setPlanForm({...planForm, validity: e.target.value})}
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Data (e.g., 1GB/day)"
                    value={planForm.data}
                    onChange={(e) => setPlanForm({...planForm, data: e.target.value})}
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={planForm.description}
                    onChange={(e) => setPlanForm({...planForm, description: e.target.value})}
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPlanModal(false);
                      setEditingPlan(null);
                      setPlanForm({ operator: '', amount: '', validity: '', data: '', description: '' });
                    }}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {editingPlan ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;