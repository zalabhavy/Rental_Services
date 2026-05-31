import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { FiTruck, FiHome, FiGrid, FiMapPin, FiCalendar, FiChevronDown } from 'react-icons/fi';

export default function CustomerLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const links = [
    { to: '/customer', icon: FiHome, label: 'Home', exact: true },
    { to: '/customer/vehicles', icon: FiGrid, label: 'Vehicles' },
    { to: '/customer/branches', icon: FiMapPin, label: 'Branches' },
    { to: '/customer/bookings', icon: FiCalendar, label: 'Bookings' },
  ];

  const handleRoleSwitch = (e) => {
    navigate(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-6">
              <Link to="/customer" className="flex items-center gap-1.5 sm:gap-2">
                <FiTruck className="text-blue-600 text-xl sm:text-2xl" />
                <span className="text-base sm:text-xl font-bold text-gray-900">RentWheels</span>
              </Link>
              <div className="hidden md:flex items-center gap-1 ml-4">
                {links.map(l => {
                  const active = l.exact ? pathname === l.to : pathname.startsWith(l.to) && !l.exact;
                  return (
                    <Link key={l.to} to={l.to}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${active ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                      <l.icon size={15} />{l.label}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="relative">
              <select onChange={handleRoleSwitch} defaultValue="/customer"
                className="appearance-none bg-blue-50 text-blue-700 text-xs font-medium pl-3 pr-7 py-1.5 rounded-full border-0 focus:ring-2 focus:ring-blue-300 focus:outline-none cursor-pointer">
                <option value="/customer">Customer</option>
                <option value="/admin">Admin</option>
                <option value="/">Home</option>
              </select>
              <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none" size={12} />
            </div>
          </div>
        </div>
      </nav>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-bottom">
        <div className="flex justify-around py-1">
          {links.map(l => {
            const active = l.exact ? pathname === l.to : pathname.startsWith(l.to);
            return (
              <Link key={l.to} to={l.to} className={`flex flex-col items-center py-1.5 px-2 text-[10px] ${active ? 'text-blue-600' : 'text-gray-400'}`}>
                <l.icon size={18} /><span className="mt-0.5">{l.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 pb-20 md:pb-8">
        <Outlet />
      </main>
    </div>
  );
}
