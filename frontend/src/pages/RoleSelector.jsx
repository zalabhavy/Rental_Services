import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUsers, FiShield, FiTruck, FiArrowRight } from 'react-icons/fi';

export default function RoleSelector() {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center px-4 py-8 sm:p-4">
      <div className="max-w-4xl w-full">
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6 sm:mb-12">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <FiTruck className="text-white text-3xl sm:text-5xl" />
            <h1 className="text-3xl sm:text-5xl font-black text-white">RentWheels</h1>
          </div>
          <p className="text-base sm:text-xl text-white/80">Premium Vehicle Rental Platform</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Link to="/customer" className="block group">
              <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-blue-500 transition-colors">
                  <FiUsers className="text-2xl sm:text-3xl text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Browse as Customer</h2>
                <p className="text-gray-500 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">Explore our fleet, view branches, book vehicles, and manage your rentals.</p>
                <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 text-sm text-gray-600">
                  <li>✓ Browse vehicle catalog</li>
                  <li>✓ Search & filter vehicles</li>
                  <li>✓ Book vehicles instantly</li>
                  <li>✓ View & cancel bookings</li>
                </ul>
                <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all">
                  Enter as Customer <FiArrowRight />
                </div>
              </div>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <Link to="/admin" className="block group">
              <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-purple-500 transition-colors">
                  <FiShield className="text-2xl sm:text-3xl text-purple-600 group-hover:text-white transition-colors" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Enter as Admin</h2>
                <p className="text-gray-500 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">Manage your rental business — branches, vehicles, bookings, and analytics.</p>
                <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 text-sm text-gray-600">
                  <li>✓ Analytics dashboard</li>
                  <li>✓ Manage branches & vehicles</li>
                  <li>✓ View all bookings</li>
                  <li>✓ Revenue tracking</li>
                </ul>
                <div className="flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-4 transition-all">
                  Enter as Admin <FiArrowRight />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
