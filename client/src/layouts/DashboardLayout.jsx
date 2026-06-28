import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaUser, FaTint, FaPlus, FaUsers, FaMoneyBill, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };

  const donorLinks = [
    { to: '/dashboard', label: 'Home', icon: <FaHome /> },
    { to: '/dashboard/profile', label: 'Profile', icon: <FaUser /> },
    { to: '/dashboard/my-donation-requests', label: 'My Donations', icon: <FaTint /> },
    { to: '/dashboard/create-donation-request', label: 'Create Request', icon: <FaPlus /> },
  ];

  const adminLinks = [
    { to: '/dashboard', label: 'Home', icon: <FaHome /> },
    { to: '/dashboard/profile', label: 'Profile', icon: <FaUser /> },
    { to: '/dashboard/all-users', label: 'All Users', icon: <FaUsers /> },
    { to: '/dashboard/all-blood-donation-request', label: 'All Donations', icon: <FaTint /> },
  ];

  const volunteerLinks = [
    { to: '/dashboard', label: 'Home', icon: <FaHome /> },
    { to: '/dashboard/profile', label: 'Profile', icon: <FaUser /> },
    { to: '/dashboard/all-blood-donation-request', label: 'All Donations', icon: <FaTint /> },
  ];

  const links = user?.role === 'admin' ? adminLinks : user?.role === 'volunteer' ? volunteerLinks : donorLinks;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-red-700 text-white flex flex-col transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="p-5 text-2xl font-bold border-b border-red-600">🩸 BloodBridge</div>
        <nav className="flex-1 p-4 space-y-2">
          {links.map(link => (
            <NavLink key={link.to} to={link.to} end={link.to === '/dashboard'}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive ? 'bg-white text-red-700 font-bold' : 'hover:bg-red-600'}`}>
              {link.icon} {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-red-600">
          <p className="text-sm mb-1 truncate">{user?.name}</p>
          <p className="text-xs text-red-200 mb-3 capitalize">{user?.role}</p>
          <button onClick={handleLogout} className="w-full bg-white text-red-700 font-semibold py-2 rounded-lg hover:bg-red-50">Logout</button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="md:hidden flex items-center justify-between p-4 bg-white shadow">
          <span className="font-bold text-red-700">🩸 BloodBridge</span>
          <button onClick={() => setOpen(!open)}>{open ? <FaTimes size={22}/> : <FaBars size={22}/>}</button>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      {open && <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={() => setOpen(false)} />}
    </div>
  );
};

export default DashboardLayout;