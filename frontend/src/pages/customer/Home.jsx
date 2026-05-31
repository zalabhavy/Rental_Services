import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiTruck, FiMapPin, FiClock, FiStar, FiArrowRight, FiShield, FiDollarSign, FiCheckCircle } from 'react-icons/fi';
import { getVehicles, getBranches } from '../../api';

// Vehicle name-specific images for realistic look
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
const handleImgError = (e) => { e.target.onerror = null; e.target.style.display = 'none'; e.target.parentElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'; };

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

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div></div>;

  return (
    <div>
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 text-white overflow-hidden mb-5 sm:mb-10">
        <div className="hidden sm:block absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 max-w-2xl">
          <span className="text-blue-200 text-xs sm:text-sm font-medium bg-white/10 px-2 sm:px-3 py-1 rounded-full">#1 Vehicle Rental Platform</span>
          <h1 className="text-lg sm:text-4xl md:text-5xl font-black mt-2 sm:mt-4 leading-tight whitespace-nowrap">Find Your Perfect Ride Today</h1>
          <p className="text-blue-100 mt-2 sm:mt-4 text-xs sm:text-lg leading-relaxed">Browse our premium fleet, pick your dates, and hit the road.</p>
          <div className="flex flex-row gap-2 sm:gap-4 mt-4 sm:mt-8">
            <Link to="/customer/vehicles" className="bg-white text-blue-700 px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-base">Browse Vehicles <FiArrowRight size={14} /></Link>
            <Link to="/customer/branches" className="bg-white/10 border border-white/30 px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold hover:bg-white/20 transition text-center text-xs sm:text-base">View Branches</Link>
          </div>
        </div>
      </motion.section>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-10">
        {[
          { icon: FiTruck, label: 'Vehicles', value: vehicles.length, color: 'text-blue-500' },
          { icon: FiMapPin, label: 'Branches', value: branches.length, color: 'text-green-500' },
          { icon: FiStar, label: 'Rating', value: '4.8★', color: 'text-yellow-500' },
          { icon: FiClock, label: 'Support', value: '24/7', color: 'text-purple-500' },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <s.icon className={`${s.color} text-2xl mb-2`} />
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            <div className="text-sm text-gray-500">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {vehicles.length > 0 ? (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Featured Vehicles</h2>
            <Link to="/customer/vehicles" className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">View All <FiArrowRight /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {(() => {
              const seen = new Set();
              return vehicles.filter(v => {
                if (v.available === false) return false;
                if (seen.has(v.vehicleName)) return false;
                seen.add(v.vehicleName);
                return true;
              }).slice(0, 6);
            })().map((v, i) => (
              <motion.div key={v.vehicleId} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}>
                <Link to={`/customer/vehicles/${v.vehicleId}`} className="block group">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1">
                    <div className="h-40 sm:h-48 bg-gray-100 overflow-hidden">
                      <img src={getVehicleImage(v)} alt={v.vehicleName}
                        onError={handleImgError}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-lg font-medium">{v.vehicleType}</span>
                        {v.available !== false
                          ? <span className="text-xs text-green-600 flex items-center gap-1"><FiCheckCircle /> Available</span>
                          : <span className="text-xs text-amber-600 flex items-center gap-1">🔒 Booked</span>}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900">{v.vehicleName}</h3>
                      <div className="flex items-center justify-between mt-2 sm:mt-3">
                        <span className="text-xl sm:text-2xl font-black text-blue-600">₹{v.pricePerHour}<span className="text-sm font-normal text-gray-400">/hr</span></span>
                        <span className="text-blue-600 group-hover:translate-x-1 transition-transform"><FiArrowRight /></span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 mb-10">
          <FiTruck className="mx-auto text-4xl text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700">No vehicles yet</h3>
          <p className="text-gray-400 mt-1">Ask admin to add vehicles to see them here</p>
        </div>
      )}

      <section className="mb-6 sm:mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Why Choose RentWheels</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
          {[
            { icon: FiDollarSign, title: 'Best Prices', desc: 'Transparent pricing. We find the cheapest available vehicle for you.' },
            { icon: FiShield, title: 'Fully Insured', desc: 'All vehicles come with comprehensive insurance coverage.' },
            { icon: FiClock, title: 'Instant Booking', desc: 'Book in seconds with real-time availability checking.' },
          ].map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4"><f.icon className="text-blue-600 text-xl" /></div>
              <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {branches.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Our Branches</h2>
            <Link to="/customer/branches" className="text-blue-600 text-sm font-medium flex items-center gap-1">View All <FiArrowRight /></Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {branches.slice(0, 4).map(b => (
              <div key={b.branchId} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <FiMapPin className="text-blue-500 text-xl mb-2" />
                <h3 className="font-semibold text-gray-900">{b.branchName}</h3>
                <p className="text-sm text-gray-500">{b.branchLocation}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
