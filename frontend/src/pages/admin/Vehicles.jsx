import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiTruck } from 'react-icons/fi';
import { getVehicles, addVehicle, updateVehicle, deleteVehicle, getBranches } from '../../api';
import ConfirmModal from '../../components/ConfirmModal';
import toast from 'react-hot-toast';

const empty = { branchName: '', vehicleName: '', vehicleType: '', pricePerHour: '', count: 1, description: '' };

export default function AdminVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const load = () => { setLoading(true); Promise.all([getVehicles(), getBranches()]).then(([v, b]) => { setVehicles(v.data?.data || []); setBranches(b.data?.data || []); }).catch(() => {}).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const branchMap = Object.fromEntries(branches.map(b => [b.branchId, b.branchName]));

  const open = (v = null) => {
    setEditing(v);
    setForm(v ? { branchName: branchMap[v.branchId] || '', vehicleName: v.vehicleName, vehicleType: v.vehicleType, pricePerHour: v.pricePerHour, count: 1, description: v.description || '' } : { ...empty });
    setModal(true);
  };
  const close = () => { setModal(false); setEditing(null); setForm({ ...empty }); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.vehicleName || !form.vehicleType || !form.pricePerHour || !form.branchName) return toast.error('Fill all required fields');
    setSaving(true);
    try {
      const payload = { ...form, pricePerHour: Number(form.pricePerHour), count: Number(form.count) };
      if (editing) { await updateVehicle(editing.vehicleId, payload); toast.success('Vehicle updated'); }
      else { await addVehicle(payload); toast.success('Vehicle added'); }
      close(); load();
    } catch (err) { toast.error(err.response?.data?.message || 'Operation failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    const id = confirmDelete;
    setConfirmDelete(null);
    try { await deleteVehicle(id); toast.success('Vehicle deleted'); load(); }
    catch (err) { toast.error(err.response?.data?.message || 'Delete failed'); }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Vehicles</h1>
          <p className="text-gray-500 mt-1 text-sm">Manage your fleet ({vehicles.length} vehicles)</p>
        </div>
        <button onClick={() => open()} className="bg-purple-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-purple-700 transition flex items-center justify-center gap-2 text-sm w-full sm:w-auto">
          <FiPlus /> Add Vehicle
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full" /></div>
      ) : vehicles.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <FiTruck className="mx-auto text-4xl text-gray-300 mb-4" />
          <h3 className="text-lg text-gray-500">No vehicles yet</h3>
          <button onClick={() => open()} className="mt-4 text-purple-600 text-sm font-medium">+ Add your first vehicle</button>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-gray-200 text-gray-500">
                  <th className="text-left py-4 px-4">Vehicle</th><th className="text-left py-4 px-4">Type</th>
                  <th className="text-left py-4 px-4">Branch</th><th className="text-left py-4 px-4">Price/hr</th>
                  <th className="text-left py-4 px-4">Status</th><th className="text-right py-4 px-4">Actions</th>
                </tr></thead>
                <tbody>
                  {vehicles.map((v, i) => (
                    <motion.tr key={v.vehicleId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.03 * i }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition group">
                      <td className="py-3 px-4 text-gray-900 font-medium">{v.vehicleName}</td>
                      <td className="py-3 px-4"><span className="bg-purple-50 text-purple-700 px-2 py-1 rounded-lg text-xs font-medium">{v.vehicleType}</span></td>
                      <td className="py-3 px-4 text-gray-600">{branchMap[v.branchId] || '-'}</td>
                      <td className="py-3 px-4 text-gray-900 font-medium">₹{v.pricePerHour}</td>
                      <td className="py-3 px-4">
                        {v.activeBookings > 0
                          ? <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700">🔒 Booked ({v.activeBookings})</span>
                          : <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">✅ Available</span>}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition">
                          <button onClick={() => open(v)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-700"><FiEdit2 size={14} /></button>
                          <button onClick={() => setConfirmDelete(v.vehicleId)} className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500"><FiTrash2 size={14} /></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {vehicles.map((v, i) => (
              <motion.div key={v.vehicleId} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.03 * i }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-gray-900">{v.vehicleName}</h3>
                      <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-lg text-xs font-medium">{v.vehicleType}</span>
                      {v.activeBookings > 0
                        ? <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">🔒 Booked</span>
                        : <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">✅ Available</span>}
                    </div>
                    <div className="flex gap-3 mt-2 text-sm text-gray-500">
                      <span>📍 {branchMap[v.branchId] || '-'}</span>
                      <span className="font-semibold text-gray-900">₹{v.pricePerHour}/hr</span>
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0 ml-2">
                    <button onClick={() => open(v)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400"><FiEdit2 size={16} /></button>
                    <button onClick={() => setConfirmDelete(v.vehicleId)} className="p-2 hover:bg-red-50 rounded-lg text-gray-400"><FiTrash2 size={16} /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Form Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-t-2xl sm:rounded-2xl p-6 w-full sm:max-w-md shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">{editing ? 'Edit Vehicle' : 'Add Vehicle'}</h2>
              <button onClick={close} className="text-gray-400 hover:text-gray-600 p-1"><FiX size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Vehicle Name *" value={form.vehicleName} onChange={e => setForm(f => ({ ...f, vehicleName: e.target.value }))}
                className="w-full px-4 py-3 sm:py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm" />
              <div className="relative">
                <input type="text" list="vehicleTypes" placeholder="Vehicle Type * (e.g. Car, SUV, Bike)" value={form.vehicleType} onChange={e => setForm(f => ({ ...f, vehicleType: e.target.value }))}
                  className="w-full px-4 py-3 sm:py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm" />
                <datalist id="vehicleTypes">
                  {['Car', 'SUV', 'Bike', 'Van', 'Truck', 'Sedan', 'Scooter', 'Bus', 'Luxury'].map(t => <option key={t} value={t} />)}
                </datalist>
              </div>
              <select value={form.branchName} onChange={e => setForm(f => ({ ...f, branchName: e.target.value }))}
                className="w-full px-4 py-3 sm:py-2.5 rounded-xl border border-gray-200 text-gray-900 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm bg-white">
                <option value="">Select Branch *</option>
                {branches.map(b => <option key={b.branchId} value={b.branchName}>{b.branchName}</option>)}
              </select>
              <input type="number" placeholder="Price per Hour (₹) *" value={form.pricePerHour} onChange={e => setForm(f => ({ ...f, pricePerHour: e.target.value }))}
                className="w-full px-4 py-3 sm:py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm" />
              {!editing && <input type="number" placeholder="Count (default 1)" value={form.count} onChange={e => setForm(f => ({ ...f, count: e.target.value }))} min={1}
                className="w-full px-4 py-3 sm:py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm" />}
              <textarea placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2}
                className="w-full px-4 py-3 sm:py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm resize-none" />
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={close} className="flex-1 px-4 py-3 sm:py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm hover:bg-gray-200 transition">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 px-4 py-3 sm:py-2.5 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 transition disabled:opacity-50">
                  {saving ? 'Saving...' : editing ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <ConfirmModal
        open={!!confirmDelete}
        title="Delete Vehicle"
        message="Are you sure you want to delete this vehicle? This action cannot be undone."
        confirmText="Delete"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(null)}
        danger
      />
    </div>
  );
}
