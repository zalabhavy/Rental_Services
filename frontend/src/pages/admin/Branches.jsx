import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiMapPin } from 'react-icons/fi';
import { getBranches, createBranch, updateBranch, deleteBranch } from '../../api';
import ConfirmModal from '../../components/ConfirmModal';
import toast from 'react-hot-toast';

const empty = { branchName: '', branchLocation: '', contactPhone: '', contactEmail: '', description: '' };

export default function AdminBranches() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const load = () => { setLoading(true); getBranches().then(r => setBranches(r.data?.data || [])).catch(() => {}).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const open = (b = null) => { setEditing(b); setForm(b ? { branchName: b.branchName, branchLocation: b.branchLocation, contactPhone: b.contactPhone || '', contactEmail: b.contactEmail || '', description: b.description || '' } : { ...empty }); setModal(true); };
  const close = () => { setModal(false); setEditing(null); setForm({ ...empty }); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.branchName.trim() || !form.branchLocation.trim()) return toast.error('Name and location are required');
    setSaving(true);
    try {
      if (editing) { await updateBranch(editing.branchId, form); toast.success('Branch updated'); }
      else { await createBranch(form); toast.success('Branch created'); }
      close(); load();
    } catch (err) { toast.error(err.response?.data?.message || err.message || 'Something went wrong'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    const id = confirmDelete;
    setConfirmDelete(null);
    try { await deleteBranch(id); toast.success('Branch deleted'); load(); }
    catch (err) { toast.error(err.response?.data?.message || 'Delete failed'); }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Branches</h1>
          <p className="text-gray-500 mt-1 text-sm">Manage rental locations</p>
        </div>
        <button onClick={() => open()} className="bg-purple-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-purple-700 transition flex items-center justify-center gap-2 text-sm w-full sm:w-auto">
          <FiPlus /> Add Branch
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full" /></div>
      ) : branches.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <FiMapPin className="mx-auto text-4xl text-gray-300 mb-4" />
          <h3 className="text-lg text-gray-500">No branches yet</h3>
          <button onClick={() => open()} className="mt-4 text-purple-600 text-sm font-medium">+ Add your first branch</button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {branches.map((b, i) => (
            <motion.div key={b.branchId} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 group hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-gray-900 truncate">{b.branchName}</h3>
                  <p className="text-gray-500 text-sm mt-1">{b.branchLocation}</p>
                  {b.contactPhone && <p className="text-gray-400 text-xs mt-2">📞 {b.contactPhone}</p>}
                  {b.contactEmail && <p className="text-gray-400 text-xs truncate">✉️ {b.contactEmail}</p>}
                </div>
                <div className="flex gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition shrink-0 ml-2">
                  <button onClick={() => open(b)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-700"><FiEdit2 size={14} /></button>
                  <button onClick={() => setConfirmDelete(b.branchId)} className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500"><FiTrash2 size={14} /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-t-2xl sm:rounded-2xl p-6 w-full sm:max-w-md shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">{editing ? 'Edit Branch' : 'Add Branch'}</h2>
              <button onClick={close} className="text-gray-400 hover:text-gray-600 p-1"><FiX size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Branch Name *" value={form.branchName} onChange={e => setForm(f => ({ ...f, branchName: e.target.value }))}
                className="w-full px-4 py-3 sm:py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm" />
              <input type="text" placeholder="Location *" value={form.branchLocation} onChange={e => setForm(f => ({ ...f, branchLocation: e.target.value }))}
                className="w-full px-4 py-3 sm:py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm" />
              <input type="text" placeholder="Phone" value={form.contactPhone} onChange={e => setForm(f => ({ ...f, contactPhone: e.target.value }))}
                className="w-full px-4 py-3 sm:py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm" />
              <input type="email" placeholder="Email" value={form.contactEmail} onChange={e => setForm(f => ({ ...f, contactEmail: e.target.value }))}
                className="w-full px-4 py-3 sm:py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm" />
              <textarea placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3}
                className="w-full px-4 py-3 sm:py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm resize-none" />
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={close} className="flex-1 px-4 py-3 sm:py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm hover:bg-gray-200 transition">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 px-4 py-3 sm:py-2.5 bg-purple-600 text-white rounded-xl text-sm font-medium hover:bg-purple-700 transition disabled:opacity-50">
                  {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete Confirm */}
      <ConfirmModal
        open={!!confirmDelete}
        title="Delete Branch"
        message="Are you sure you want to delete this branch? This action cannot be undone and will remove all associated data."
        confirmText="Delete"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(null)}
        danger
      />
    </div>
  );
}
