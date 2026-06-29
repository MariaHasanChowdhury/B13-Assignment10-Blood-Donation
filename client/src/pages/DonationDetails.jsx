import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';

const DonationDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [donation, setDonation] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => { api.get(`/donations/${id}`).then(r => setDonation(r.data)); }, [id]);

  const handleDonate = async () => {
    await api.put(`/donations/${id}`, { status: 'inprogress', donorName: user.name, donorEmail: user.email });
    toast.success('Thank you for confirming! Status updated.');
    setShowModal(false);
    setDonation(prev => ({ ...prev, status: 'inprogress' }));
  };

  if (!donation) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-red-700 mb-6">Donation Request Details</h2>
          <div className="space-y-3 text-gray-700">
            <p><strong>Recipient:</strong> {donation.recipientName}</p>
            <p><strong>Blood Group:</strong> <span className="text-red-600 font-bold">{donation.bloodGroup}</span></p>
            <p><strong>Location:</strong> {donation.recipientDistrict}, {donation.recipientUpazila}</p>
            <p><strong>Hospital:</strong> {donation.hospitalName}</p>
            <p><strong>Address:</strong> {donation.fullAddress}</p>
            <p><strong>Date & Time:</strong> {donation.donationDate} at {donation.donationTime}</p>
            <p><strong>Message:</strong> {donation.requestMessage}</p>
            <p><strong>Requested by:</strong> {donation.requesterName} ({donation.requesterEmail})</p>
            <p><strong>Status:</strong> <span className="capitalize font-semibold text-blue-600">{donation.status}</span></p>
          </div>
          {donation.status === 'pending' && (
            <button onClick={() => setShowModal(true)} className="mt-6 w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700">I Want to Donate 🩸</button>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-xl w-80">
            <h3 className="text-lg font-bold mb-4">Confirm Donation</h3>
            <input value={user?.name} readOnly className="input-field mb-3 bg-gray-50" />
            <input value={user?.email} readOnly className="input-field mb-4 bg-gray-50" />
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-300 py-2 rounded-lg">Cancel</button>
              <button onClick={handleDonate} className="flex-1 bg-red-600 text-white py-2 rounded-lg">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationDetails;