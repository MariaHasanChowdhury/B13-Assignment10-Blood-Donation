import { useState } from 'react';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { districts, upazilasByDistrict } from '../utils/locations';

const SearchPage = () => {
  const [form, setForm] = useState({ bloodGroup: '', district: '', upazila: '' });
  const [donors, setDonors] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    const res = await api.get('/users/search', { params: form });
    setDonors(res.data);
    setSearched(true);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-red-700 mb-8">🔍 Search Blood Donors</h2>
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <select onChange={e => setForm({...form, bloodGroup: e.target.value})} className="input-field">
              <option value="">Blood Group</option>
              {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(b => <option key={b}>{b}</option>)}
            </select>
            <select onChange={e => setForm({...form, district: e.target.value, upazila: ''})} className="input-field">
              <option value="">District</option>
              {districts.map(d => <option key={d}>{d}</option>)}
            </select>
            <select onChange={e => setForm({...form, upazila: e.target.value})} className="input-field">
              <option value="">Upazila</option>
              {(upazilasByDistrict[form.district] || []).map(u => <option key={u}>{u}</option>)}
            </select>
          </div>
          <button onClick={handleSearch} className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700">Search</button>
        </div>

        {searched && (
          donors.length === 0
            ? <p className="text-center text-gray-500">No donors found.</p>
            : <div className="grid md:grid-cols-2 gap-6">
                {donors.map(d => (
                  <div key={d._id} className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
                    <img src={d.avatar} className="w-14 h-14 rounded-full object-cover border-2 border-red-200" />
                    <div>
                      <p className="font-bold text-gray-800">{d.name}</p>
                      <p className="text-gray-500 text-sm">{d.district}, {d.upazila}</p>
                      <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-bold">{d.bloodGroup}</span>
                    </div>
                  </div>
                ))}
              </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;