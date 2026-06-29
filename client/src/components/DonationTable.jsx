import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const DonationTable = ({ donations, onUpdate, adminMode = false }) => {
  const { user } = useAuth();
  const [deleteId, setDeleteId] = useState(null);

  const handleStatus = async (id, status) => {
    await api.put(`/donations/${id}`, { status });
    toast.success('Status updated');
    onUpdate();
  };

  const handleDelete = async () => {
    await api.delete(`/donations/${deleteId}`);
    toast.success('Deleted');
    setDeleteId(null);
    onUpdate();
  };

  const canEdit = (donation) => adminMode ? true : donation.requesterEmail === user?.email;

  return (
    <>
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="w-full text-sm text-left">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="px-4 py-3">Recipient</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Blood</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Donor</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {donations.map(d => (
              <tr key={d._id} className="hover:bg-red-50">
                <td className="px-4 py-3 font-medium">{d.recipientName}</td>
                <td className="px-4 py-3">{d.recipientDistrict}, {d.recipientUpazila}</td>
                <td className="px-4 py-3">{d.donationDate} {d.donationTime}</td>
                <td className="px-4 py-3"><span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">{d.bloodGroup}</span></td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    d.status === 'done' ? 'bg-green-100 text-green-700' :
                    d.status === 'inprogress' ? 'bg-yellow-100 text-yellow-700' :
                    d.status === 'canceled' ? 'bg-gray-100 text-gray-600' :
                    'bg-blue-100 text-blue-700'}`}>{d.status}</span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {d.status === 'inprogress' && <span>{d.donorName}<br/>{d.donorEmail}</span>}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1 flex-wrap">
                    <Link to={`/donation-requests/${d._id}`} className="text-blue-600 hover:underline text-xs">View</Link>
                    {canEdit(d) && d.status !== 'done' && d.status !== 'canceled' && (
                      <>
                        <Link to={`/dashboard/edit-donation/${d._id}`} className="text-yellow-600 hover:underline text-xs ml-2">Edit</Link>
                        <button onClick={() => setDeleteId(d._id)} className="text-red-500 hover:underline text-xs ml-2">Delete</button>
                      </>
                    )}
                    {d.status === 'inprogress' && canEdit(d) && (
                      <>
                        <button onClick={() => handleStatus(d._id, 'done')} className="bg-green-500 text-white text-xs px-2 py-1 rounded ml-1">Done</button>
                        <button onClick={() => handleStatus(d._id, 'canceled')} className="bg-gray-400 text-white text-xs px-2 py-1 rounded ml-1">Cancel</button>
                      </>
                    )}
                    {(user?.role === 'volunteer' || user?.role === 'admin') && d.status !== 'done' && d.status !== 'canceled' && (
                      <select onChange={e => handleStatus(d._id, e.target.value)} defaultValue={d.status}
                        className="text-xs border border-gray-300 rounded px-1 ml-1">
                        {['pending','inprogress','done','canceled'].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-xl w-80 text-center">
            <h3 className="text-lg font-bold mb-2">Confirm Delete?</h3>
            <p className="text-gray-500 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 border rounded-lg text-gray-600">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DonationTable;