import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { FiTruck, FiBarChart2, FiMapPin, FiGrid, FiCalendar, FiChevronDown } from 'react-icons/fi';

export default function AdminLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const links = [
    { to: '/admin', icon: FiBarChart2, label: 'Dashboard', exact: true },
    { to: '/admin/branches', icon: FiMapPin, label: 'Branches' },
    { to: '/admin/vehicles', icon: FiGrid, label: 'Vehicles' },
    { to: '/admin/bookings', icon: FiCalendar, label: 'Bookings' },
  ];

  const handleRoleSwitch = (e) => {
    navigate(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 bg-white flex-col border-r border-gray-200 fixed h-full">
        <div className="p-5 border-b border-gray-200">
          <Link to="/admin" className="flex items-center gap-2">
            <FiTruck className="text-purple-600 text-xl" />
            <span className="text-lg font-bold text-gray-900">RentWheels</span>
          </Link>
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full mt-2 inline-block font-medium">Admin</span>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {links.map(l => {
            const active = l.exact ? pathname === l.to : pathname.startsWith(l.to) && !l.exact;
            return (
              <Link key={l.to} to={l.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${active ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                <l.icon size={16} />{l.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-gray-200">
          <div className="relative">
            <select onChange={handleRoleSwitch} defaultValue="/admin"
              className="w-full appearance-none bg-gray-50 text-gray-700 text-xs font-medium pl-3 pr-7 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-300 focus:outline-none cursor-pointer">
              <option value="/admin">Admin View</option>
              <option value="/customer">Customer View</option>
              <option value="/">Home</option>
            </select>
            <FiChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 px-3 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <FiTruck className="text-purple-600 text-lg" />
          <span className="font-bold text-gray-900 text-sm">RentWheels</span>
          <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full font-medium ml-1">Admin</span>
        </div>
        <div className="relative">
          <select onChange={handleRoleSwitch} defaultValue="/admin"
            className="appearance-none bg-purple-50 text-purple-700 text-[10px] font-medium pl-2 pr-5 py-1 rounded-full border-0 focus:ring-2 focus:ring-purple-300 focus:outline-none cursor-pointer">
            <option value="/admin">Admin</option>
            <option value="/customer">Customer</option>
            <option value="/">Home</option>
          </select>
          <FiChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 text-purple-500 pointer-events-none" size={10} />
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-bottom">
        <div className="flex justify-around py-1">
          {links.map(l => {
            const active = l.exact ? pathname === l.to : pathname.startsWith(l.to);
            return (
              <Link key={l.to} to={l.to} className={`flex flex-col items-center py-1.5 px-2 text-[10px] ${active ? 'text-purple-600' : 'text-gray-400'}`}>
                <l.icon size={18} /><span className="mt-0.5">{l.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <main className="md:ml-60 p-3 sm:p-4 md:p-8 pt-14 md:pt-8 pb-20 md:pb-8 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
