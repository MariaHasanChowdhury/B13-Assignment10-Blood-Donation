import { useEffect, useState } from 'react';
import api from '../../utils/api';
import DonationTable from '../../components/DonationTable';

const MyDonationRequests = () => {
  const [donations, setDonations] = useState([]);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;

  const fetchData = () => {
    api.get('/donations/my', { params: filter ? { status: filter } : {} }).then(r => setDonations(r.data));
  };

  useEffect(() => { fetchData(); }, [filter]);

  const paginated = donations.slice((page-1)*perPage, page*perPage);
  const totalPages = Math.ceil(donations.length / perPage);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">My Donation Requests</h2>
      <select onChange={e => setFilter(e.target.value)} className="mb-4 input-field w-48">
        <option value="">All Status</option>
        {['pending','inprogress','done','canceled'].map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <DonationTable donations={paginated} onUpdate={fetchData} />
      {totalPages > 1 && (
        <div className="flex gap-2 mt-4 justify-center">
          {Array.from({length: totalPages}, (_, i) => (
            <button key={i} onClick={() => setPage(i+1)}
              className={`px-3 py-1 rounded ${page === i+1 ? 'bg-red-600 text-white' : 'bg-gray-200'}`}>{i+1}</button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDonationRequests;