import { Outlet, Link, useLocation } from 'react-router-dom';
import { FiTruck, FiHome, FiGrid, FiMapPin, FiCalendar, FiArrowLeft } from 'react-icons/fi';

export default function CustomerLayout() {
  const { pathname } = useLocation();
  const links = [
    { to: '/customer', icon: FiHome, label: 'Home', exact: true },
    { to: '/customer/vehicles', icon: FiGrid, label: 'Vehicles' },
    { to: '/customer/branches', icon: FiMapPin, label: 'Branches' },
    { to: '/customer/bookings', icon: FiCalendar, label: 'My Bookings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <Link to="/" className="text-gray-400 hover:text-gray-600 transition"><FiArrowLeft size={18} /></Link>
              <Link to="/customer" className="flex items-center gap-2">
                <FiTruck className="text-blue-600 text-2xl" />
                <span className="text-xl font-bold text-gray-900">RentWheels</span>
              </Link>
              <div className="hidden md:flex items-center gap-1 ml-6">
                {links.map(l => {
                  const active = l.exact ? pathname === l.to : pathname.startsWith(l.to) && !l.exact;
                  return (
                    <Link key={l.to} to={l.to}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${active ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                      <l.icon size={16} />{l.label}
                    </Link>
                  );
                })}
              </div>
            </div>
            <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">Customer View</span>
          </div>
        </div>
      </nav>
      {/* Mobile nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50 px-2 py-1">
        <div className="flex justify-around">
          {links.map(l => {
            const active = l.exact ? pathname === l.to : pathname.startsWith(l.to);
            return (
              <Link key={l.to} to={l.to} className={`flex flex-col items-center py-2 px-3 text-xs ${active ? 'text-blue-600' : 'text-gray-400'}`}>
                <l.icon size={20} /><span className="mt-1">{l.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        <Outlet />
      </main>
    </div>
  );
}
