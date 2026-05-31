import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiXCircle, FiCheckCircle, FiAlertCircle, FiEdit2, FiX } from 'react-icons/fi';
import { getBookings, cancelBooking, bookVehicle } from '../../api';
import ConfirmModal from '../../components/ConfirmModal';
import toast from 'react-hot-toast';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmCancel, setConfirmCancel] = useState(null);
  const [editBooking, setEditBooking] = useState(null);
  const [editForm, setEditForm] = useState({ startTime: '', endTime: '', customerName: '', customerEmail: '', customerPhone: '' });

  const load = () => {
    setLoading(true);
    getBookings()
      .then(r => setBookings(r.data?.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleCancel = async () => {
    const id = confirmCancel;
    setConfirmCancel(null);
    try {
      await cancelBooking(id);
      toast.success('Booking cancelled');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Cancel failed');
    }
  };

  const openEdit = (b) => {
    setEditBooking(b);
    setEditForm({
      startTime: b.startTime || '',
      endTime: b.endTime || '',
      customerName: b.customerName || '',
      customerEmail: b.customerEmail || '',
      customerPhone: '',
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!editForm.startTime || !editForm.endTime) return toast.error('Select time slots');
    if (Number(editForm.startTime) >= Number(editForm.endTime)) return toast.error('End time must be after start time');

    try {
      // Cancel old booking then create new one
      await cancelBooking(editBooking.bookingId);
      await bookVehicle({
        vehicleName: editBooking.vehicleName,
        vehicleType: editBooking.vehicleType,
        startTime: Number(editForm.startTime),
        endTime: Number(editForm.endTime),
        customerName: editForm.customerName,
        customerEmail: editForm.customerEmail,
        customerPhone: editForm.customerPhone,
      });
      toast.success('Booking updated successfully!');
      setEditBooking(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  const statusColors = {
    ACTIVE: 'bg-amber-100 text-amber-700',
    COMPLETED: 'bg-green-100 text-green-700',
    CANCELLED: 'bg-red-100 text-red-700',
  };
  const statusIcons = { ACTIVE: FiCheckCircle, COMPLETED: FiCheckCircle, CANCELLED: FiXCircle };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Bookings</h1>
        <p className="text-gray-500 mt-1 text-sm">View and manage your vehicle rentals</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <FiCalendar className="mx-auto text-4xl text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700">No bookings yet</h3>
          <p className="text-gray-400 mt-1">Book a vehicle to see it here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b, i) => {
            const StatusIcon = statusIcons[b.status] || FiAlertCircle;
            return (
              <motion.div
                key={b.bookingId || i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        {b.vehicleName || b.vehicleType}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1 ${statusColors[b.status] || 'bg-gray-100 text-gray-600'}`}>
                        <StatusIcon size={12} /> {b.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FiClock size={14} /> {b.startTime}:00 — {b.endTime}:00 ({b.endTime - b.startTime}h)
                      </span>
                      {b.branchName && <span>📍 {b.branchName}</span>}
                      <span>₹{b.pricePerHour}/hr</span>
                      {b.totalPrice && (
                        <span className="font-semibold text-gray-700">Total: ₹{b.totalPrice}</span>
                      )}
                    </div>
                    {b.customerName && (
                      <p className="text-xs text-gray-400 mt-2">Booked by: {b.customerName}</p>
                    )}
                    {b.bookingDate && (
                      <p className="text-xs text-gray-400">
                        Date: {new Date(b.bookingDate).toLocaleString()}
                      </p>
                    )}
                  </div>
                  {b.status === 'ACTIVE' && (
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => openEdit(b)}
                        className="flex-1 sm:flex-none px-4 py-2.5 bg-blue-50 text-blue-600 rounded-xl text-sm font-medium hover:bg-blue-100 transition flex items-center justify-center gap-1"
                      >
                        <FiEdit2 size={14} /> Edit
                      </button>
                      <button
                        onClick={() => setConfirmCancel(b.bookingId)}
                        className="flex-1 sm:flex-none px-4 py-2.5 bg-red-50 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition flex items-center justify-center gap-1"
                      >
                        <FiXCircle size={14} /> Cancel
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Edit Booking Modal */}
      {editBooking && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-t-2xl sm:rounded-2xl p-6 w-full sm:max-w-md shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Edit Booking</h2>
              <button onClick={() => setEditBooking(null)} className="text-gray-400 hover:text-gray-600 p-1"><FiX size={20} /></button>
            </div>
            <div className="bg-blue-50 rounded-xl p-3 mb-4 text-sm text-blue-700">
              🚗 {editBooking.vehicleName} — {editBooking.vehicleType}
            </div>
            <form onSubmit={handleEdit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Start Hour</label>
                  <select value={editForm.startTime} onChange={e => setEditForm(f => ({...f, startTime: e.target.value}))}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm">
                    <option value="">Select</option>
                    {Array.from({length: 24}, (_, i) => <option key={i} value={i}>{String(i).padStart(2, '0')}:00</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">End Hour</label>
                  <select value={editForm.endTime} onChange={e => setEditForm(f => ({...f, endTime: e.target.value}))}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm">
                    <option value="">Select</option>
                    {Array.from({length: 24}, (_, i) => <option key={i} value={i}>{String(i).padStart(2, '0')}:00</option>)}
                  </select>
                </div>
              </div>
              <input type="text" placeholder="Your Name" value={editForm.customerName} onChange={e => setEditForm(f => ({...f, customerName: e.target.value}))}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" />
              <input type="email" placeholder="Your Email" value={editForm.customerEmail} onChange={e => setEditForm(f => ({...f, customerEmail: e.target.value}))}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" />
              <input type="tel" placeholder="Your Phone" value={editForm.customerPhone} onChange={e => setEditForm(f => ({...f, customerPhone: e.target.value}))}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" />
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setEditBooking(null)} className="flex-1 px-4 py-3 sm:py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm hover:bg-gray-200 transition">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-3 sm:py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition">Update Booking</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <ConfirmModal
        open={!!confirmCancel}
        title="Cancel Booking"
        message="Are you sure you want to cancel this booking? You may be charged a cancellation fee."
        confirmText="Yes, Cancel"
        onConfirm={handleCancel}
        onCancel={() => setConfirmCancel(null)}
        danger
      />
    </div>
  );
}
