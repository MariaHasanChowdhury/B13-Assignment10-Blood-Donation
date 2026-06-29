import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import DonationTable from '../../components/DonationTable';

const AllDonations = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [filter, setFilter] = useState('');

  const fetchData = () => api.get('/donations/all', { params: filter ? { status: filter } : {} }).then(r => setDonations(r.data));
  useEffect(() => { fetchData(); }, [filter]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">All Blood Donation Requests</h2>
      <select onChange={e => setFilter(e.target.value)} className="mb-4 input-field w-48">
        <option value="">All Status</option>
        {['pending','inprogress','done','canceled'].map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <DonationTable donations={donations} onUpdate={fetchData} adminMode={true} />
    </div>
  );
};

export default AllDonations;