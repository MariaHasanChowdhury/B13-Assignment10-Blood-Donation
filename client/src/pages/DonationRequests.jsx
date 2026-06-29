import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DonationRequests = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => { api.get('/donations/pending').then(r => setDonations(r.data)); }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-red-700 mb-8">🩸 Pending Blood Requests</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map(d => (
            <div key={d._id} className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-gray-800 text-lg">{d.recipientName}</h3>
                <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-sm font-bold">{d.bloodGroup}</span>
              </div>
              <p className="text-gray-500 text-sm mb-1">📍 {d.recipientDistrict}, {d.recipientUpazila}</p>
              <p className="text-gray-500 text-sm mb-1">📅 {d.donationDate} at {d.donationTime}</p>
              <p className="text-gray-500 text-sm mb-4 truncate">🏥 {d.hospitalName}</p>
              <Link to={`/donation-requests/${d._id}`} className="block text-center bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">View Details</Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DonationRequests;