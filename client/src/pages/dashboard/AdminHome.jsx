import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import { FaUsers, FaTint, FaMoneyBillWave } from 'react-icons/fa';

const AdminHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ users: 0, donations: 0, funds: 0 });

  useEffect(() => {
    Promise.all([
      api.get('/users'),
      api.get('/donations/all'),
      api.get('/funding/total')
    ]).then(([u, d, f]) => setStats({ users: u.data.length, donations: d.data.length, funds: f.data.total }));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Welcome, <span className="text-red-600">{user?.name}</span>! 👋</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: <FaUsers className="text-4xl text-blue-500"/>, label: 'Total Donors', value: stats.users },
          { icon: <FaTint className="text-4xl text-red-500"/>, label: 'Total Requests', value: stats.donations },
          { icon: <FaMoneyBillWave className="text-4xl text-green-500"/>, label: 'Total Funding ($)', value: stats.funds.toFixed(2) },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
            {s.icon}
            <div>
              <p className="text-3xl font-bold text-gray-800">{s.value}</p>
              <p className="text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;