import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import RoleSelector from './pages/RoleSelector';
import CustomerLayout from './layouts/CustomerLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/customer/Home';
import Vehicles from './pages/customer/Vehicles';
import VehicleDetail from './pages/customer/VehicleDetail';
import Branches from './pages/customer/Branches';
import MyBookings from './pages/customer/MyBookings';
import AdminDashboard from './pages/admin/Dashboard';
import AdminBranches from './pages/admin/Branches';
import AdminVehicles from './pages/admin/Vehicles';
import AdminBookings from './pages/admin/Bookings';

function App() {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3000, style: { borderRadius: '12px', background: '#1e293b', color: '#fff' } }} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RoleSelector />} />
          <Route path="/customer" element={<CustomerLayout />}>
            <Route index element={<Home />} />
            <Route path="vehicles" element={<Vehicles />} />
            <Route path="vehicles/:id" element={<VehicleDetail />} />
            <Route path="branches" element={<Branches />} />
            <Route path="bookings" element={<MyBookings />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="branches" element={<AdminBranches />} />
            <Route path="vehicles" element={<AdminVehicles />} />
            <Route path="bookings" element={<AdminBookings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
