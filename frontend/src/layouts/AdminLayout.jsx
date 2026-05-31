import { Outlet, Link, useLocation } from 'react-router-dom';
import { FiTruck, FiBarChart2, FiMapPin, FiGrid, FiCalendar, FiArrowLeft } from 'react-icons/fi';

export default function AdminLayout() {
  const { pathname } = useLocation();
  const links = [
    { to: '/admin', icon: FiBarChart2, label: 'Dashboard', exact: true },
    { to: '/admin/branches', icon: FiMapPin, label: 'Branches' },
    { to: '/admin/vehicles', icon: FiGrid, label: 'Vehicles' },
    { to: '/admin/bookings', icon: FiCalendar, label: 'Bookings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="hidden md:flex w-64 bg-white flex-col border-r border-gray-200 fixed h-full">
        <div className="p-6 border-b border-gray-200">
          <Link to="/" className="text-gray-400 hover:text-gray-600 text-xs flex items-center gap-1 mb-3"><FiArrowLeft size={12} /> Back to Home</Link>
          <Link to="/admin" className="flex items-center gap-2">
            <FiTruck className="text-purple-600 text-2xl" />
            <span className="text-xl font-bold text-gray-900">RentWheels</span>
          </Link>
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full mt-2 inline-block font-medium">Admin Panel</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {links.map(l => {
            const active = l.exact ? pathname === l.to : pathname.startsWith(l.to) && !l.exact;
            return (
              <Link key={l.to} to={l.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${active ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                <l.icon size={18} />{l.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2"><FiTruck className="text-purple-600" /><span className="font-bold text-gray-900">Admin</span></div>
        <Link to="/" className="text-gray-400 text-sm">← Home</Link>
      </div>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 px-2 py-1">
        <div className="flex justify-around">
          {links.map(l => {
            const active = l.exact ? pathname === l.to : pathname.startsWith(l.to);
            return (
              <Link key={l.to} to={l.to} className={`flex flex-col items-center py-2 px-3 text-xs ${active ? 'text-purple-600' : 'text-gray-400'}`}>
                <l.icon size={20} /><span className="mt-1">{l.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
      <main className="md:ml-64 flex-1 p-4 md:p-8 pt-16 md:pt-8 pb-24 md:pb-8 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
