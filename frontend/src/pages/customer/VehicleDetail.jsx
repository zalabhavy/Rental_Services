import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiClock, FiMapPin, FiDollarSign, FiCheckCircle } from 'react-icons/fi';
import { getVehicle, getBranch, bookVehicle } from '../../api';
import toast from 'react-hot-toast';

const vehicleTypeImages = {
  Car: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=500&fit=crop',
  SUV: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&h=500&fit=crop',
  Bike: 'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?w=800&h=500&fit=crop',
  Sedan: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&h=500&fit=crop',
  Scooter: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800&h=500&fit=crop',
  Van: 'https://images.unsplash.com/photo-1543465077-db45d34b88a5?w=800&h=500&fit=crop',
  Truck: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=500&fit=crop',
  Bus: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&h=500&fit=crop',
  Luxury: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=500&fit=crop',
};
const defaultImg = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=500&fit=crop';
const getVehicleImage = (v) => v.imageUrl || vehicleTypeImages[v.vehicleType] || defaultImg;
const handleImgError = (e) => { e.target.onerror = null; e.target.style.display = 'none'; e.target.parentElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'; };

export default function VehicleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [branch, setBranch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [form, setForm] = useState({ startTime: '', endTime: '', customerName: '', customerEmail: '', customerPhone: '' });

  useEffect(() => {
    getVehicle(id).then(r => {
      const v = r.data?.data;
      setVehicle(v);
      if (v?.branchId) getBranch(v.branchId).then(br => setBranch(br.data?.data)).catch(() => {});
    }).catch(() => toast.error('Vehicle not found')).finally(() => setLoading(false));
  }, [id]);

  const handleBook = async (e) => {
    e.preventDefault();
    if (!form.startTime || !form.endTime) return toast.error('Please fill in all booking fields');
    if (Number(form.startTime) >= Number(form.endTime)) return toast.error('End time must be after start time');
    setBooking(true);
    try {
      await bookVehicle({
        vehicleName: vehicle.vehicleName,
        vehicleType: vehicle.vehicleType,
        startTime: Number(form.startTime),
        endTime: Number(form.endTime),
        customerName: form.customerName,
        customerEmail: form.customerEmail,
        customerPhone: form.customerPhone,
      });
      toast.success('Vehicle booked successfully! 🎉');
      navigate('/customer/bookings');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally {
      setBooking(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div></div>;
  if (!vehicle) return <div className="text-center py-16"><h3 className="text-xl text-gray-500">Vehicle not found</h3><Link to="/customer/vehicles" className="text-blue-600 mt-2 inline-block">← Back</Link></div>;

  const hours = form.startTime && form.endTime ? Math.max(0, Number(form.endTime) - Number(form.startTime)) : 0;
  const total = hours * (vehicle.pricePerHour || 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Link to="/customer/vehicles" className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 text-sm"><FiArrowLeft /> Back to Vehicles</Link>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <img src={getVehicleImage(vehicle)} alt={vehicle.vehicleName}
            onError={handleImgError}
            className="w-full h-80 lg:h-full object-cover" />
        </div>

        {/* Details + Booking */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-sm font-medium">{vehicle.vehicleType}</span>
              {vehicle.available !== false
                ? <span className="text-green-600 text-sm flex items-center gap-1"><FiCheckCircle /> Available</span>
                : <span className="text-amber-600 text-sm flex items-center gap-1">🔒 Currently Booked</span>}
            </div>
            <h1 className="text-3xl font-black text-gray-900">{vehicle.vehicleName}</h1>
            {branch && (
              <p className="text-gray-500 flex items-center gap-2 mt-2"><FiMapPin /> {branch.branchName} — {branch.branchLocation}</p>
            )}
            {vehicle.description && <p className="text-gray-500 mt-4 leading-relaxed">{vehicle.description}</p>}
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-black text-blue-600">₹{vehicle.pricePerHour}</span>
              <span className="text-gray-400">/hour</span>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Book This Vehicle</h2>
            <form onSubmit={handleBook} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Start Hour</label>
                  <select value={form.startTime} onChange={e => setForm(f => ({...f, startTime: e.target.value}))}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm">
                    <option value="">Select</option>
                    {Array.from({length: 24}, (_, i) => <option key={i} value={i}>{String(i).padStart(2, '0')}:00</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">End Hour</label>
                  <select value={form.endTime} onChange={e => setForm(f => ({...f, endTime: e.target.value}))}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm">
                    <option value="">Select</option>
                    {Array.from({length: 24}, (_, i) => <option key={i} value={i}>{String(i).padStart(2, '0')}:00</option>)}
                  </select>
                </div>
              </div>
              <input type="text" placeholder="Your Name" value={form.customerName} onChange={e => setForm(f => ({...f, customerName: e.target.value}))}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" />
              <input type="email" placeholder="Your Email" value={form.customerEmail} onChange={e => setForm(f => ({...f, customerEmail: e.target.value}))}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" />
              <input type="tel" placeholder="Your Phone" value={form.customerPhone} onChange={e => setForm(f => ({...f, customerPhone: e.target.value}))}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" />

              {hours > 0 && (
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">₹{vehicle.pricePerHour} × {hours} hours</span>
                    <span className="font-bold text-blue-700">₹{total}</span>
                  </div>
                </div>
              )}

              <button type="submit" disabled={booking}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2">
                {booking ? <><div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div> Booking...</> : 'Book Now'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
