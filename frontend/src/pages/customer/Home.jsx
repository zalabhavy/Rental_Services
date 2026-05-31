import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiTruck, FiMapPin, FiClock, FiStar, FiArrowRight, FiShield, FiDollarSign, FiCheckCircle, FiZap } from 'react-icons/fi';
import { getVehicles, getBranches } from '../../api';

const vehicleTypeImages = {
  Car: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=400&fit=crop',
  SUV: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&h=400&fit=crop',
  Bike: 'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?w=600&h=400&fit=crop',
  Sedan: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=600&h=400&fit=crop',
  Scooter: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=600&h=400&fit=crop',
  Van: 'https://images.unsplash.com/photo-1543465077-db45d34b88a5?w=600&h=400&fit=crop',
  Truck: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&h=400&fit=crop',
  Bus: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&h=400&fit=crop',
  Luxury: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop',
};
const defaultImg = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop';
const getVehicleImage = (v) => v.imageUrl || vehicleTypeImages[v.vehicleType] || defaultImg;
const handleImgError = (e) => { e.target.onerror = null; e.target.style.display = 'none'; e.target.parentElement.style.background = 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)'; };

export default function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getVehicles(), getBranches()])
      .then(([vRes, bRes]) => { setVehicles(vRes.data?.data || []); setBranches(bRes.data?.data || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const uniqueAvailable = (() => {
    const seen = new Set();
    return vehicles.filter(v => {
      if (v.available === false) return false;
      if (seen.has(v.vehicleName)) return false;
      seen.add(v.vehicleName);
      return true;
    }).slice(0, 6);
  })();

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div></div>;

  return (
    <div>
      {/* Hero */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl sm:rounded-3xl overflow-hidden mb-6 sm:mb-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900" />
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}} />
        <div className="relative z-10 p-5 sm:p-8 md:p-12">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-blue-200 text-xs sm:text-sm font-medium bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
              <FiZap size={12} /> #1 Vehicle Rental Platform
            </span>
            <h1 className="text-xl sm:text-4xl md:text-5xl font-black text-white mt-3 sm:mt-4 leading-tight whitespace-nowrap">
              Find Your Perfect Ride Today
            </h1>
            <p className="text-blue-100 mt-2 sm:mt-4 text-xs sm:text-lg leading-relaxed max-w-lg">
              Premium fleet. Instant booking. Best prices guaranteed.
            </p>
            <div className="flex flex-row gap-2 sm:gap-4 mt-4 sm:mt-8">
              <Link to="/customer/vehicles" className="bg-white text-blue-700 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold hover:bg-blue-50 transition flex items-center gap-1.5 text-xs sm:text-base shadow-lg shadow-blue-900/20">
                Browse Vehicles <FiArrowRight size={14} />
              </Link>
              <Link to="/customer/branches" className="bg-white/10 border border-white/25 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold hover:bg-white/20 transition text-xs sm:text-base backdrop-blur-sm">
                View Branches
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-10">
        {[
          { icon: FiTruck, value: vehicles.length, label: 'Vehicles', color: 'text-blue-600', bg: 'bg-blue-50' },
          { icon: FiMapPin, value: branches.length, label: 'Branches', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { icon: FiStar, value: '4.8★', label: 'Rating', color: 'text-amber-600', bg: 'bg-amber-50' },
          { icon: FiClock, value: '24/7', label: 'Support', color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
            className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-sm border border-gray-100 text-center">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 ${s.bg} rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-1.5 sm:mb-2`}>
              <s.icon className={`${s.color} text-sm sm:text-lg`} />
            </div>
            <div className="text-lg sm:text-2xl font-bold text-gray-900">{s.value}</div>
            <div className="text-[10px] sm:text-sm text-gray-500">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Featured Vehicles */}
      {uniqueAvailable.length > 0 ? (
        <section className="mb-6 sm:mb-10">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Featured Vehicles</h2>
            <Link to="/customer/vehicles" className="text-blue-600 text-xs sm:text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View All <FiArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
            {uniqueAvailable.map((v, i) => (
              <motion.div key={v.vehicleId} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i }}>
                <Link to={`/customer/vehicles/${v.vehicleId}`} className="block group">
                  <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1">
                    <div className="h-28 sm:h-48 bg-gray-100 overflow-hidden relative">
                      <img src={getVehicleImage(v)} alt={v.vehicleName} onError={handleImgError}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <span className="absolute top-2 left-2 text-[10px] sm:text-xs bg-white/90 backdrop-blur-sm text-blue-600 px-2 py-0.5 rounded-lg font-medium shadow-sm">{v.vehicleType}</span>
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate">{v.vehicleName}</h3>
                      <div className="flex items-center justify-between mt-1.5 sm:mt-2">
                        <span className="text-base sm:text-xl font-black text-blue-600">₹{v.pricePerHour}<span className="text-[10px] sm:text-xs font-normal text-gray-400">/hr</span></span>
                        <span className="text-[10px] sm:text-xs text-green-600 flex items-center gap-0.5"><FiCheckCircle size={10} /> Available</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      ) : (
        <div className="text-center py-12 sm:py-16 bg-white rounded-2xl border border-gray-100 mb-6 sm:mb-10">
          <FiTruck className="mx-auto text-3xl sm:text-4xl text-gray-300 mb-3" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-700">No vehicles available</h3>
          <p className="text-gray-400 mt-1 text-sm">Check back soon!</p>
        </div>
      )}

      {/* Why Choose Us */}
      <section className="mb-6 sm:mb-10">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Why RentWheels?</h2>
        <div className="grid grid-cols-3 gap-2 sm:gap-6">
          {[
            { icon: FiDollarSign, title: 'Best Prices', desc: 'Cheapest vehicle auto-selected', color: 'text-blue-600', bg: 'bg-blue-50' },
            { icon: FiShield, title: 'Insured', desc: 'Full coverage included', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { icon: FiZap, title: 'Instant', desc: 'Book in seconds', color: 'text-amber-600', bg: 'bg-amber-50' },
          ].map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
              className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-sm border border-gray-100 text-center sm:text-left">
              <div className={`w-9 h-9 sm:w-12 sm:h-12 ${f.bg} rounded-lg sm:rounded-xl flex items-center justify-center mx-auto sm:mx-0 mb-2 sm:mb-4`}>
                <f.icon className={`${f.color} text-base sm:text-xl`} />
              </div>
              <h3 className="font-bold text-gray-900 text-xs sm:text-base mb-0.5 sm:mb-1">{f.title}</h3>
              <p className="text-gray-500 text-[10px] sm:text-sm leading-relaxed hidden sm:block">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Branches */}
      {branches.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Our Branches</h2>
            <Link to="/customer/branches" className="text-blue-600 text-xs sm:text-sm font-medium flex items-center gap-1">View All <FiArrowRight size={14} /></Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
            {branches.slice(0, 6).map((b, i) => (
              <motion.div key={b.branchId} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
                className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100">
                <div className="w-7 h-7 sm:w-9 sm:h-9 bg-blue-50 rounded-lg flex items-center justify-center mb-2">
                  <FiMapPin className="text-blue-500 text-xs sm:text-base" />
                </div>
                <h3 className="font-semibold text-gray-900 text-xs sm:text-sm truncate">{b.branchName}</h3>
                <p className="text-[10px] sm:text-xs text-gray-500 truncate">{b.branchLocation}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
