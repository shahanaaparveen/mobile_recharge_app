import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Bills = () => {
  const [selectedBill, setSelectedBill] = useState('');
  const [billNumber, setBillNumber] = useState('');

  const billTypes = [
    { id: 'electricity', name: 'Electricity Bill', icon: 'fa-bolt', color: 'bg-yellow-500' },
    { id: 'gas', name: 'Gas Bill', icon: 'fa-fire', color: 'bg-blue-500' },
    { id: 'water', name: 'Water Bill', icon: 'fa-tint', color: 'bg-cyan-500' },
    { id: 'internet', name: 'Internet Bill', icon: 'fa-wifi', color: 'bg-purple-500' },
    { id: 'dth', name: 'DTH/Cable', icon: 'fa-tv', color: 'bg-green-500' },
    { id: 'insurance', name: 'Insurance', icon: 'fa-shield-alt', color: 'bg-red-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Link to="/dashboard" className="text-primary hover:text-secondary mr-4">
            <i className="fas fa-arrow-left text-xl"></i>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bill Payment</h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {billTypes.map(bill => (
            <div
              key={bill.id}
              className={`card cursor-pointer transition-all hover:shadow-lg hover:border-primary ${
                selectedBill === bill.id ? 'border-primary bg-red-50 dark:bg-red-900/20' : ''
              }`}
              onClick={() => setSelectedBill(bill.id)}
            >
              <div className="flex items-center">
                <div className={`w-12 h-12 ${bill.color} rounded-lg flex items-center justify-center mr-4`}>
                  <i className={`fas ${bill.icon} text-white text-xl`}></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{bill.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Pay your {bill.name.toLowerCase()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedBill && (
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Pay {billTypes.find(b => b.id === selectedBill)?.name}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bill Number / Consumer ID
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter your bill number"
                  value={billNumber}
                  onChange={(e) => setBillNumber(e.target.value)}
                />
              </div>

              <button
                disabled={!billNumber}
                className="w-full bg-primary hover:bg-secondary text-white font-semibold py-3 px-4 rounded-lg disabled:opacity-50 transition-colors"
              >
                Fetch Bill Details
              </button>
            </div>

            {billNumber && (
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Bill Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Consumer Name:</span>
                    <span className="font-medium text-gray-900 dark:text-white">John Doe</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Bill Amount:</span>
                    <span className="font-medium text-primary">₹1,250</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Due Date:</span>
                    <span className="font-medium text-gray-900 dark:text-white">25 Dec 2024</span>
                  </div>
                </div>
                
                <button className="w-full mt-4 bg-primary hover:bg-secondary text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                  Pay Now ₹1,250
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bills;