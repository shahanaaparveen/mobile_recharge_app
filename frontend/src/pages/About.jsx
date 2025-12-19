import React from 'react';

const About = () => {
  const features = [
    { icon: 'fa-bolt', title: 'Instant Recharge', desc: 'Lightning-fast mobile recharges in seconds' },
    { icon: 'fa-shield-alt', title: 'Secure Payments', desc: 'Bank-level security for all transactions' },
    { icon: 'fa-gift', title: 'Best Offers', desc: 'Exclusive deals and cashback rewards' },
    { icon: 'fa-headset', title: '24/7 Support', desc: 'Round-the-clock customer assistance' }
  ];

  const stats = [
    { number: '10M+', label: 'Happy Users' },
    { number: '50M+', label: 'Transactions' },
    { number: '99.9%', label: 'Success Rate' },
    { number: '24/7', label: 'Support' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <i className="fas fa-mobile-alt text-white text-4xl"></i>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="text-primary">MobileRecharge</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              India's most trusted mobile recharge platform, serving millions of customers with 
              instant recharges, bill payments, and exclusive offers since 2020.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Experience the best in mobile recharge services
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <i className={`fas ${feature.icon} text-white text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-xl text-red-100 mb-6 leading-relaxed">
                To revolutionize digital payments in India by providing the fastest, 
                most secure, and user-friendly mobile recharge experience.
              </p>
              <div className="space-y-4">
                <div className="flex items-center text-red-100">
                  <i className="fas fa-check-circle mr-3 text-xl"></i>
                  <span>Instant processing with 99.9% success rate</span>
                </div>
                <div className="flex items-center text-red-100">
                  <i className="fas fa-check-circle mr-3 text-xl"></i>
                  <span>Support for all major operators across India</span>
                </div>
                <div className="flex items-center text-red-100">
                  <i className="fas fa-check-circle mr-3 text-xl"></i>
                  <span>Exclusive cashback and reward programs</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">4.8★</div>
                    <div className="text-red-100">App Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">₹500Cr+</div>
                    <div className="text-red-100">Processed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">50+</div>
                    <div className="text-red-100">Cities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">5 Sec</div>
                    <div className="text-red-100">Avg Time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-heart text-blue-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Customer First</h3>
              <p className="text-gray-600 dark:text-gray-300">Every decision we make puts our customers at the center</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-rocket text-green-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300">Constantly evolving to bring you the latest technology</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-handshake text-purple-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Trust</h3>
              <p className="text-gray-600 dark:text-gray-300">Building lasting relationships through transparency and reliability</p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Testimonials */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real feedback from millions of happy users
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 relative">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">R</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Rahul Sharma</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Mumbai, Maharashtra</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400"></i>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "Absolutely amazing! Recharge happens in seconds and I always get cashback. 
                Best app for mobile recharge in India!"
              </p>
              <div className="absolute top-6 right-6 text-primary text-4xl opacity-20">
                <i className="fas fa-quote-right"></i>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 relative">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Priya Patel</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Ahmedabad, Gujarat</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400"></i>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "Super convenient! I can recharge for my entire family from one app. 
                The offers are fantastic and customer support is excellent."
              </p>
              <div className="absolute top-6 right-6 text-primary text-4xl opacity-20">
                <i className="fas fa-quote-right"></i>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 relative">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Amit Kumar</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Delhi, NCR</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400"></i>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "Never had any issues with transactions. Lightning fast and secure. 
                I've been using this for 2 years now. Highly recommended!"
              </p>
              <div className="absolute top-6 right-6 text-primary text-4xl opacity-20">
                <i className="fas fa-quote-right"></i>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 relative">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Sneha Reddy</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Bangalore, Karnataka</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400"></i>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "The UI is so clean and easy to use. My mom can also recharge easily now. 
                Great job on making it user-friendly for all ages!"
              </p>
              <div className="absolute top-6 right-6 text-primary text-4xl opacity-20">
                <i className="fas fa-quote-right"></i>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 relative">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">V</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Vikash Singh</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Patna, Bihar</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400"></i>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "Best cashback offers in the market! I save money on every recharge. 
                The bill payment feature is also very convenient."
              </p>
              <div className="absolute top-6 right-6 text-primary text-4xl opacity-20">
                <i className="fas fa-quote-right"></i>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 relative">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Meera Joshi</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Pune, Maharashtra</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400"></i>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "Trustworthy and reliable service. Never faced any payment issues. 
                The transaction history feature helps me track all my recharges easily."
              </p>
              <div className="absolute top-6 right-6 text-primary text-4xl opacity-20">
                <i className="fas fa-quote-right"></i>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-full px-8 py-4 shadow-lg">
              <div className="flex items-center mr-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star text-yellow-400 text-xl"></i>
                  ))}
                </div>
                <span className="ml-3 text-2xl font-bold text-gray-900 dark:text-white">4.8</span>
              </div>
              <div className="border-l border-gray-300 dark:border-gray-600 pl-6">
                <p className="text-gray-600 dark:text-gray-300 font-medium">Based on 2M+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Experience the Future of Recharge?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join millions of satisfied customers and enjoy instant, secure mobile recharges
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary hover:bg-secondary text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors">
              Start Recharging Now
            </button>
            <button className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors">
              Download App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;