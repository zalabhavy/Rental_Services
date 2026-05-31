import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiTruck, FiCalendar, FiDollarSign, FiActivity, FiCheckCircle } from 'react-icons/fi';
import { getDashboardStats } from '../../api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats().then(r => setStats(r.data?.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full"></div></div>;

  const cards = stats ? [
    { icon: FiMapPin, label: 'Total Branches', value: stats.totalBranches, bg: 'bg-blue-50', ic: 'text-blue-600' },
    { icon: FiTruck, label: 'Total Vehicles', value: stats.totalVehicles, bg: 'bg-green-50', ic: 'text-green-600' },
    { icon: FiCalendar, label: 'Total Bookings', value: stats.totalBookings, bg: 'bg-purple-50', ic: 'text-purple-600' },
    { icon: FiActivity, label: 'Active (Booked)', value: stats.activeBookings, bg: 'bg-amber-50', ic: 'text-amber-600' },
    { icon: FiCheckCircle, label: 'Completed', value: stats.completedBookings || 0, bg: 'bg-green-50', ic: 'text-green-600' },
    { icon: FiDollarSign, label: 'Total Revenue', value: `₹${(stats.totalRevenue || 0).toLocaleString()}`, bg: 'bg-emerald-50', ic: 'text-emerald-600' },
  ] : [];

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1 text-sm">Overview of your rental business</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {cards.map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
            className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-sm border border-gray-100">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 ${c.bg} rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3`}>
              <c.icon className={`${c.ic} text-sm sm:text-lg`} />
            </div>
            <div className="text-lg sm:text-2xl font-bold text-gray-900 truncate">{c.value}</div>
            <div className="text-xs sm:text-sm text-gray-500">{c.label}</div>
          </motion.div>
        ))}
      </div>

      {stats?.bookingsByVehicleType?.length > 0 && (
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Bookings by Vehicle Type</h2>
          <div className="space-y-3">
            {stats.bookingsByVehicleType.map((item, i) => {
              const max = Math.max(...stats.bookingsByVehicleType.map(x => x.count || 0));
              const pct = max > 0 ? ((item.count || 0) / max) * 100 : 0;
              return (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{item.type || 'Unknown'}</span>
                    <span className="text-gray-500">{item.count} bookings</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.1 * i, duration: 0.8 }}
                      className="h-full bg-purple-500 rounded-full" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {stats?.revenueByBranch?.length > 0 && (
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Revenue by Branch</h2>
          <div className="space-y-3">
            {stats.revenueByBranch.map((item, i) => {
              const max = Math.max(...stats.revenueByBranch.map(x => x.revenue || 0));
              const pct = max > 0 ? ((item.revenue || 0) / max) * 100 : 0;
              return (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{item.branch || 'Unknown'}</span>
                    <span className="text-gray-500">₹{(item.revenue || 0).toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.1 * i, duration: 0.8 }}
                      className="h-full bg-blue-500 rounded-full" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {stats?.recentBookings?.length > 0 && (
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Recent Bookings</h2>
          <div className="space-y-2">
            {stats.recentBookings.map((b, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                <div className="min-w-0 flex-1">
                  <span className="text-sm font-medium text-gray-900">{b.vehicleName || '-'}</span>
                  <span className="text-xs text-gray-400 ml-2">{b.customerName || ''}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm text-gray-600">₹{b.totalPrice || 0}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${b.status === 'ACTIVE' ? 'bg-amber-100 text-amber-700' : b.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{b.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
