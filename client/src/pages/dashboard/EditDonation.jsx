import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const EditDonation = () => {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/donations/${id}`).then(r => reset(r.data));
  }, [id]);

  const onSubmit = async (data) => {
    await api.put(`/donations/${id}`, data);
    toast.success('Updated!');
    navigate('/dashboard/my-donation-requests');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Donation Request</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow p-6 space-y-4">
        <input {...register('recipientName')} placeholder="Recipient Name" className="input-field" />
        <input {...register('hospitalName')} placeholder="Hospital Name" className="input-field" />
        <input {...register('fullAddress')} placeholder="Full Address" className="input-field" />
        <input {...register('donationDate')} type="date" className="input-field" />
        <input {...register('donationTime')} type="time" className="input-field" />
        <textarea {...register('requestMessage')} rows={4} className="input-field" />
        <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700">Update Donation Request</button>
      </form>
    </div>
  );
};

export default EditDonation;