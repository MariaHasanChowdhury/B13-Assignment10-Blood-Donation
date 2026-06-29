import { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');

  const fetchUsers = () => api.get('/users', { params: filter ? { status: filter } : {} }).then(r => setUsers(r.data));
  useEffect(() => { fetchUsers(); }, [filter]);

  const updateUser = async (id, data) => {
    await api.patch(`/users/${id}`, data);
    toast.success('Updated!');
    fetchUsers();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">All Users</h2>
      <select onChange={e => setFilter(e.target.value)} className="mb-4 input-field w-48">
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="blocked">Blocked</option>
      </select>
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="w-full text-sm text-left">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="px-4 py-3">Avatar</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {users.map(u => (
              <tr key={u._id} className="hover:bg-red-50">
                <td className="px-4 py-3"><img src={u.avatar} className="w-9 h-9 rounded-full object-cover" /></td>
                <td className="px-4 py-3 font-medium">{u.name}</td>
                <td className="px-4 py-3 text-gray-500">{u.email}</td>
                <td className="px-4 py-3 capitalize">{u.role}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${u.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{u.status}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1 flex-wrap">
                    {u.status === 'active'
                      ? <button onClick={() => updateUser(u._id, { status: 'blocked' })} className="text-xs bg-red-500 text-white px-2 py-1 rounded">Block</button>
                      : <button onClick={() => updateUser(u._id, { status: 'active' })} className="text-xs bg-green-500 text-white px-2 py-1 rounded">Unblock</button>
                    }
                    {u.role !== 'volunteer' && u.role !== 'admin' && (
                      <button onClick={() => updateUser(u._id, { role: 'volunteer' })} className="text-xs bg-blue-500 text-white px-2 py-1 rounded ml-1">Make Volunteer</button>
                    )}
                    {u.role !== 'admin' && (
                      <button onClick={() => updateUser(u._id, { role: 'admin' })} className="text-xs bg-purple-500 text-white px-2 py-1 rounded ml-1">Make Admin</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;