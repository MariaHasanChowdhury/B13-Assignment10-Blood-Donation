import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import DonationTable from '../../components/DonationTable';

const DonorHome = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    api.get('/donations/my').then(res => setDonations(res.data.slice(0, 3)));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome, <span className="text-red-600">{user?.name}</span>! 👋</h1>
      <p className="text-gray-500 mb-6">Here are your recent donation requests.</p>

      {donations.length > 0 && (
        <>
          <DonationTable donations={donations} onUpdate={() => api.get('/donations/my').then(r => setDonations(r.data.slice(0,3)))} />
          <Link to="/dashboard/my-donation-requests" className="inline-block mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">View All Requests →</Link>
        </>
      )}
    </div>
  );
};

export default DonorHome;