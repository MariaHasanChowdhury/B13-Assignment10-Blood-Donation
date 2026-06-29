import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name, district: user?.district, upazila: user?.upazila, bloodGroup: user?.bloodGroup });

  const handleSave = async () => {
    const res = await api.put('/users/me', form);
    setUser(res.data);
    toast.success('Profile updated!');
    setEditing(false);
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
        {!editing ? (
          <button onClick={() => setEditing(true)} className="bg-red-600 text-white px-4 py-2 rounded-lg">Edit</button>
        ) : (
          <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded-lg">Save</button>
        )}
      </div>
      <div className="bg-white rounded-2xl shadow p-6 space-y-4">
        <div className="flex items-center gap-4 mb-4">
          <img src={user?.avatar} alt="avatar" className="w-20 h-20 rounded-full object-cover border-4 border-red-200" />
          <div>
            <p className="font-bold text-lg text-gray-800">{user?.name}</p>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-bold">{user?.bloodGroup}</span>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-600">Full Name</label>
            <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} disabled={!editing} className={`input-field ${!editing && 'bg-gray-50'}`} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Email (not editable)</label>
            <input value={user?.email} disabled className="input-field bg-gray-50 cursor-not-allowed" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Blood Group</label>
            <select value={form.bloodGroup} onChange={e => setForm({...form, bloodGroup: e.target.value})} disabled={!editing} className={`input-field ${!editing && 'bg-gray-50'}`}>
              {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">District</label>
            <input value={form.district} onChange={e => setForm({...form, district: e.target.value})} disabled={!editing} className={`input-field ${!editing && 'bg-gray-50'}`} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600">Upazila</label>
            <input value={form.upazila} onChange={e => setForm({...form, upazila: e.target.value})} disabled={!editing} className={`input-field ${!editing && 'bg-gray-50'}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;