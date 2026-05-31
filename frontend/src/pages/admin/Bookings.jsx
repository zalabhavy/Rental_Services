import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiCheckCircle, FiXCircle, FiCheck } from 'react-icons/fi';
import { getBookings, cancelBooking, completeBooking } from '../../api';
import ConfirmModal from '../../components/ConfirmModal';
import toast from 'react-hot-toast';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [confirmAction, setConfirmAction] = useState(null); // { id, type: 'cancel' | 'complete' }

  const load = () => { setLoading(true); getBookings().then(r => setBookings(r.data?.data || [])).catch(() => {}).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const handleAction = async () => {
    const { id, type } = confirmAction;
    setConfirmAction(null);
    try {
      if (type === 'cancel') { await cancelBooking(id); toast.success('Booking cancelled'); }
      else { await completeBooking(id); toast.success('Booking completed — vehicle released'); }
      load();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const filtered = filter === 'ALL' ? bookings : bookings.filter(b => b.status === filter);
  const counts = {
    ALL: bookings.length,
    ACTIVE: bookings.filter(b => b.status === 'ACTIVE').length,
    COMPLETED: bookings.filter(b => b.status === 'COMPLETED').length,
    CANCELLED: bookings.filter(b => b.status === 'CANCELLED').length,
  };

  const statusStyle = {
    ACTIVE: 'bg-amber-100 text-amber-700',
    COMPLETED: 'bg-green-100 text-green-700',
    CANCELLED: 'bg-red-100 text-red-700',
  };
  const statusIcon = { ACTIVE: '🔒', COMPLETED: '✅', CANCELLED: '❌' };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Bookings</h1>
        <p className="text-gray-500 mt-1 text-sm">View and manage all bookings</p>
      </div>

      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
        {['ALL', 'ACTIVE', 'COMPLETED', 'CANCELLED'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition whitespace-nowrap ${filter === f ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
            {f} ({counts[f]})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <FiCalendar className="mx-auto text-4xl text-gray-300 mb-4" />
          <h3 className="text-lg text-gray-500">No bookings found</h3>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((b, i) => (
            <motion.div key={b.bookingId || i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.03 * i }}
              className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 hover:shadow-lg transition">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-gray-900 font-bold">{b.vehicleName || b.vehicleType}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${statusStyle[b.status] || 'bg-gray-100 text-gray-600'}`}>
                      {statusIcon[b.status]} {b.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-500">
                    <span>🕐 {b.startTime}:00 — {b.endTime}:00</span>
                    {b.branchName && <span>📍 {b.branchName}</span>}
                    <span>💰 ₹{b.pricePerHour}/hr</span>
                    {b.totalPrice != null && <span className="text-purple-600 font-medium">Total: ₹{b.totalPrice}</span>}
                  </div>
                  {b.customerName && <p className="text-xs text-gray-400 mt-1">👤 {b.customerName} {b.customerEmail ? `(${b.customerEmail})` : ''}</p>}
                  {b.bookingDate && <p className="text-xs text-gray-400 mt-0.5">{new Date(b.bookingDate).toLocaleString()}</p>}
                </div>
                {b.status === 'ACTIVE' && (
                  <div className="flex gap-2 shrink-0 w-full sm:w-auto">
                    <button onClick={() => setConfirmAction({ id: b.bookingId, type: 'complete' })}
                      className="flex-1 sm:flex-none px-4 py-2.5 bg-green-50 text-green-600 rounded-xl text-sm font-medium hover:bg-green-100 transition flex items-center justify-center gap-1">
                      <FiCheck size={14} /> Complete
                    </button>
                    <button onClick={() => setConfirmAction({ id: b.bookingId, type: 'cancel' })}
                      className="flex-1 sm:flex-none px-4 py-2.5 bg-red-50 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition flex items-center justify-center gap-1">
                      <FiXCircle size={14} /> Cancel
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <ConfirmModal
        open={!!confirmAction}
        title={confirmAction?.type === 'complete' ? 'Complete Booking' : 'Cancel Booking'}
        message={confirmAction?.type === 'complete'
          ? 'Mark this booking as completed? The vehicle will be released and available for new bookings.'
          : 'Are you sure you want to cancel this booking?'}
        confirmText={confirmAction?.type === 'complete' ? 'Complete' : 'Cancel Booking'}
        onConfirm={handleAction}
        onCancel={() => setConfirmAction(null)}
        danger={confirmAction?.type === 'cancel'}
      />
    </div>
  );
}
