import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Link to="/dashboard" className="text-primary hover:text-secondary mr-4">
            <i className="fas fa-arrow-left text-xl"></i>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Profile</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="card text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{user?.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{user?.email}</p>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-lg transition-colors"
              >
                <i className="fas fa-edit mr-2"></i>
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {/* Profile Details */}
          <div className="md:col-span-2">
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Personal Information
              </h3>
              
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <button className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-lg transition-colors">
                    Save Changes
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-300">Full Name:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{user?.name}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-300">Email:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{user?.email}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-300">Phone:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{user?.phone || 'Not provided'}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-gray-600 dark:text-gray-300">Member Since:</span>
                    <span className="font-medium text-gray-900 dark:text-white">Dec 2024</span>
                  </div>
                </div>
              )}
            </div>

            {/* Account Stats */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="card text-center">
                <div className="text-3xl font-bold text-primary mb-2">24</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Total Recharges</div>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">₹2,450</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Total Spent</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <Link to="/history" className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
                <i className="fas fa-history text-blue-600 text-xl"></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Transaction History</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">View all transactions</p>
              </div>
            </div>
          </Link>

          <Link to="/offers" className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-4">
                <i className="fas fa-gift text-green-600 text-xl"></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">My Offers</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">View available offers</p>
              </div>
            </div>
          </Link>

          <div className="card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-4">
                <i className="fas fa-cog text-purple-600 text-xl"></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Settings</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Account settings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;