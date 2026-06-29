import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { districts, upazilasByDistrict } from '../../utils/locations';

const CreateDonation = () => {
  const { user } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const onSubmit = async (data) => {
    try {
      await api.post('/donations', { ...data, status: 'pending' });
      toast.success('Donation request created!');
      navigate('/dashboard/my-donation-requests');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Donation Request</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Requester Name</label>
            <input value={user?.name} readOnly className="input-field bg-gray-50" {...register('requesterName')} />
          </div>
          <div>
            <label className="text-sm font-medium">Requester Email</label>
            <input value={user?.email} readOnly className="input-field bg-gray-50" {...register('requesterEmail')} />
          </div>
        </div>
        <input {...register('recipientName', { required: true })} placeholder="Recipient Name" className="input-field" />
        <div className="grid grid-cols-2 gap-4">
          <select {...register('recipientDistrict', { required: true })} className="input-field" onChange={e => setSelectedDistrict(e.target.value)}>
            <option value="">Recipient District</option>
            {districts.map(d => <option key={d}>{d}</option>)}
          </select>
          <select {...register('recipientUpazila', { required: true })} className="input-field">
            <option value="">Recipient Upazila</option>
            {(upazilasByDistrict[selectedDistrict] || []).map(u => <option key={u}>{u}</option>)}
          </select>
        </div>
        <input {...register('hospitalName', { required: true })} placeholder="Hospital Name" className="input-field" />
        <input {...register('fullAddress', { required: true })} placeholder="Full Address Line" className="input-field" />
        <select {...register('bloodGroup', { required: true })} className="input-field">
          <option value="">Blood Group</option>
          {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(b => <option key={b}>{b}</option>)}
        </select>
        <div className="grid grid-cols-2 gap-4">
          <input {...register('donationDate', { required: true })} type="date" className="input-field" />
          <input {...register('donationTime', { required: true })} type="time" className="input-field" />
        </div>
        <textarea {...register('requestMessage', { required: true })} rows={4} placeholder="Why do you need blood? (details)" className="input-field" />
        <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition">Submit Request</button>
      </form>
    </div>
  );
};

export default CreateDonation;