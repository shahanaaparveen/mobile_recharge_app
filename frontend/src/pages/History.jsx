import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';

const History = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const data = await api.getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Failed to fetch transactions');
    }
    setLoading(false);
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true;
    if (filter === 'success') return transaction.status === 'success';
    if (filter === 'pending') return transaction.status === 'pending';
    if (filter === 'failed') return transaction.status === 'failed';
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'failed': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Link to="/dashboard" className="text-primary hover:text-secondary mr-4">
            <i className="fas fa-arrow-left text-xl"></i>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Transaction History</h1>
        </div>

        <div className="card mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              All ({transactions.length})
            </button>
            <button
              onClick={() => setFilter('success')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'success' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Success ({transactions.filter(t => t.status === 'success').length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'pending' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Pending ({transactions.filter(t => t.status === 'pending').length})
            </button>
            <button
              onClick={() => setFilter('failed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'failed' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Failed ({transactions.filter(t => t.status === 'failed').length})
            </button>
          </div>
        </div>

        {filteredTransactions.length > 0 ? (
          <div className="space-y-4">
            {filteredTransactions.map((transaction, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                      <i className="fas fa-mobile-alt text-white"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Mobile Recharge
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {transaction.phone} • {transaction.operator}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(transaction.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-lg text-gray-900 dark:text-white">
                      ₹{transaction.amount}
                    </div>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      ID: {transaction.transactionId}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <i className="fas fa-history text-gray-400 text-6xl mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Transactions Found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {filter === 'all' 
                ? "You haven't made any transactions yet." 
                : `No ${filter} transactions found.`}
            </p>
            <Link 
              to="/recharge" 
              className="inline-block bg-primary hover:bg-secondary text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Make Your First Recharge
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;