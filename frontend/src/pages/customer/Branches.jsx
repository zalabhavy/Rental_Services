import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { getBranches } from '../../api';

export default function Branches() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBranches().then(r => setBranches(r.data?.data || [])).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div></div>;

  return (
    <div>
      <div className="mb-4 sm:mb-8">
        <h1 className="text-xl sm:text-3xl font-bold text-gray-900">Our Branches</h1>
        <p className="text-gray-500 mt-1 text-xs sm:text-base">Find a rental location near you</p>
      </div>

      {branches.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <FiMapPin className="mx-auto text-4xl text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700">No branches yet</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {branches.map((b, i) => (
            <motion.div key={b.branchId} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="w-9 h-9 sm:w-12 sm:h-12 bg-blue-50 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <FiMapPin className="text-blue-600 text-base sm:text-xl" />
              </div>
              <h3 className="text-base sm:text-xl font-bold text-gray-900">{b.branchName}</h3>
              <p className="text-gray-500 mt-0.5 sm:mt-1 text-sm">{b.branchLocation}</p>
              {b.description && <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2">{b.description}</p>}
              <div className="mt-2 sm:mt-4 space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-500">
                {b.contactPhone && <p className="flex items-center gap-1.5 sm:gap-2"><FiPhone size={12} /> {b.contactPhone}</p>}
                {b.contactEmail && <p className="flex items-center gap-1.5 sm:gap-2"><FiMail size={12} /> {b.contactEmail}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
