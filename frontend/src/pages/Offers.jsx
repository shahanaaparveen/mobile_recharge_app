import React from 'react';
import { Link } from 'react-router-dom';

const Offers = () => {
  const offers = [
    {
      id: 1,
      title: "Flat 20% Cashback",
      description: "Get 20% cashback on recharges above ₹500",
      code: "SAVE20",
      validity: "Valid till 31 Dec 2024",
      maxCashback: "₹100",
      color: "bg-gradient-to-r from-green-500 to-green-600"
    },
    {
      id: 2,
      title: "First Recharge Bonus",
      description: "Extra ₹50 cashback on your first recharge",
      code: "FIRST50",
      validity: "Valid for new users only",
      maxCashback: "₹50",
      color: "bg-gradient-to-r from-blue-500 to-blue-600"
    },
    {
      id: 3,
      title: "Weekend Special",
      description: "Double cashback on weekend recharges",
      code: "WEEKEND2X",
      validity: "Valid on Sat & Sun",
      maxCashback: "₹200",
      color: "bg-gradient-to-r from-purple-500 to-purple-600"
    },
    {
      id: 4,
      title: "Bill Payment Offer",
      description: "₹25 cashback on bill payments above ₹1000",
      code: "BILLPAY25",
      validity: "Valid till 15 Jan 2025",
      maxCashback: "₹25",
      color: "bg-gradient-to-r from-orange-500 to-orange-600"
    },
    {
      id: 5,
      title: "Refer & Earn",
      description: "Earn ₹100 for each successful referral",
      code: "REFER100",
      validity: "No expiry",
      maxCashback: "Unlimited",
      color: "bg-gradient-to-r from-pink-500 to-pink-600"
    },
    {
      id: 6,
      title: "Monthly Saver",
      description: "10% extra talk time on monthly packs",
      code: "MONTHLY10",
      validity: "Valid on monthly plans",
      maxCashback: "₹150",
      color: "bg-gradient-to-r from-red-500 to-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Link to="/dashboard" className="text-primary hover:text-secondary mr-4">
            <i className="fas fa-arrow-left text-xl"></i>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Special Offers</h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map(offer => (
            <div key={offer.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`${offer.color} p-4 text-white`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold">{offer.title}</h3>
                  <i className="fas fa-gift text-xl"></i>
                </div>
                <p className="text-sm opacity-90">{offer.description}</p>
              </div>
              
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Promo Code:</span>
                    <div className="flex items-center">
                      <span className="font-mono font-bold text-primary bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                        {offer.code}
                      </span>
                      <button className="ml-2 text-primary hover:text-secondary">
                        <i className="fas fa-copy"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Max Cashback:</span>
                    <span className="font-semibold text-green-600">{offer.maxCashback}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Validity:</span>
                    <span className="text-sm text-gray-900 dark:text-white">{offer.validity}</span>
                  </div>
                </div>
                
                <button className="w-full mt-4 bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                  Use This Offer
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 card">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            How to Use Offers
          </h2>
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-start">
              <i className="fas fa-check-circle text-green-500 mr-3 mt-0.5"></i>
              <span>Copy the promo code from the offer card</span>
            </div>
            <div className="flex items-start">
              <i className="fas fa-check-circle text-green-500 mr-3 mt-0.5"></i>
              <span>Proceed with your recharge or bill payment</span>
            </div>
            <div className="flex items-start">
              <i className="fas fa-check-circle text-green-500 mr-3 mt-0.5"></i>
              <span>Enter the promo code at checkout</span>
            </div>
            <div className="flex items-start">
              <i className="fas fa-check-circle text-green-500 mr-3 mt-0.5"></i>
              <span>Enjoy instant cashback or benefits</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;