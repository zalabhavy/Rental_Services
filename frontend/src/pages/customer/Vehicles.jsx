import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
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
const handleImgError = (e) => { e.target.onerror = null; e.target.style.display = 'none'; e.target.parentElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'; };

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [branchFilter, setBranchFilter] = useState('');

  useEffect(() => {
    Promise.all([getVehicles(), getBranches()])
      .then(([vRes, bRes]) => {
        setVehicles(vRes.data?.data || []);
        setBranches(bRes.data?.data || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const types = [...new Set(vehicles.map(v => v.vehicleType).filter(Boolean))];
  const branchMap = Object.fromEntries(branches.map(b => [b.branchId, b.branchName]));

  const filtered = vehicles.filter(v => {
    if (search && !v.vehicleName?.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter && v.vehicleType !== typeFilter) return false;
    if (branchFilter && String(v.branchId) !== branchFilter) return false;
    return true;
  });

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div></div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Vehicle Catalog</h1>
        <p className="text-gray-500 mt-1">Browse and book from our premium fleet</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search vehicles..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" />
          </div>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white">
            <option value="">All Types</option>
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={branchFilter} onChange={e => setBranchFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white">
            <option value="">All Branches</option>
            {branches.map(b => <option key={b.branchId} value={b.branchId}>{b.branchName}</option>)}
          </select>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4">{filtered.length} vehicle{filtered.length !== 1 ? 's' : ''} found</p>

      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <FiFilter className="mx-auto text-4xl text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700">No vehicles found</h3>
          <p className="text-gray-400 mt-1">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((v, i) => (
            <motion.div key={v.vehicleId} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
              <Link to={`/customer/vehicles/${v.vehicleId}`} className="block group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="h-48 bg-gray-100 overflow-hidden">
                    <img src={getVehicleImage(v)} alt={v.vehicleName}
                      onError={handleImgError}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-lg font-medium">{v.vehicleType}</span>
                        {v.available !== false
                          ? <span className="text-xs text-green-600 flex items-center gap-1"><FiCheckCircle /> Available</span>
                          : <span className="text-xs text-amber-600 flex items-center gap-1">🔒 Booked</span>}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{v.vehicleName}</h3>
                    {branchMap[v.branchId] && <p className="text-xs text-gray-400 mt-1">📍 {branchMap[v.branchId]}</p>}
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-2xl font-black text-blue-600">₹{v.pricePerHour}<span className="text-sm font-normal text-gray-400">/hr</span></span>
                      <span className="text-blue-600 group-hover:translate-x-1 transition-transform"><FiArrowRight /></span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
