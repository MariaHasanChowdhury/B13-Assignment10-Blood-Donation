import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [drop, setDrop] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold text-red-700">🩸 BloodBridge</Link>
        <div className="flex items-center gap-6">
          <NavLink to="/donation-requests" className="text-gray-600 hover:text-red-600 font-medium">Donations</NavLink>
          {user && <NavLink to="/funding" className="text-gray-600 hover:text-red-600 font-medium">Funding</NavLink>}
          {!user ? (
            <Link to="/login" className="bg-red-600 text-white px-5 py-2 rounded-full hover:bg-red-700 transition">Login</Link>
          ) : (
            <div className="relative">
              <img src={user.avatar} alt="avatar" onClick={() => setDrop(!drop)}
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-red-500 object-cover" />
              {drop && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-xl w-44 py-2 z-50">
                  <Link to="/dashboard" onClick={() => setDrop(false)} className="block px-4 py-2 hover:bg-red-50 text-gray-700">Dashboard</Link>
                  <button onClick={() => { logout(); navigate('/login'); setDrop(false); }}
                    className="block w-full text-left px-4 py-2 hover:bg-red-50 text-gray-700">Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;