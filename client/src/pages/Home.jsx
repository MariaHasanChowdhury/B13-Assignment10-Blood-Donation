import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaDroplet, FaHandHoldingHeart, FaHospital } from 'react-icons/fa6';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Banner */}
      <section className="bg-gradient-to-r from-red-700 to-red-900 text-white py-24 px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h1 className="text-5xl font-extrabold mb-4">Every Drop Counts 🩸</h1>
          <p className="text-xl text-red-200 mb-8 max-w-xl mx-auto">Join our community of heroes. Donate blood, save lives. Be the reason someone smiles today.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/register" className="bg-white text-red-700 font-bold px-8 py-3 rounded-full hover:bg-red-50 transition shadow-lg">Join as a Donor</Link>
            <Link to="/search" className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-red-700 transition">Search Donors</Link>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          {[
            { icon: <FaDroplet className="text-red-500 text-4xl"/>, title: 'Blood Donated', count: '1,200+' },
            { icon: <FaHandHoldingHeart className="text-red-500 text-4xl"/>, title: 'Lives Saved', count: '850+' },
            { icon: <FaHospital className="text-red-500 text-4xl"/>, title: 'Hospitals Supported', count: '50+' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }}
              className="text-center p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition">
              <div className="flex justify-center mb-3">{s.icon}</div>
              <h3 className="text-3xl font-bold text-gray-800">{s.count}</h3>
              <p className="text-gray-500 mt-1">{s.title}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Donate */}
      <section className="py-16 bg-red-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-red-700 mb-10">Why Donate Blood?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: '💉 Save 3 Lives', desc: 'One donation can save up to 3 lives — every pint counts.' },
              { title: '🏥 Hospital Need', desc: 'Hospitals constantly need fresh blood for surgeries and emergencies.' },
              { title: '❤️ Health Benefits', desc: 'Regular donation can improve your heart health and reduce iron levels.' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow text-left">
                <h3 className="font-bold text-lg text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-red-700 text-center mb-10">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <p className="text-gray-600 mb-4">📞 +880-1700-000000</p>
              <p className="text-gray-600 mb-4">📧 info@bloodbridge.com</p>
              <p className="text-gray-600">📍 Dhaka, Bangladesh</p>
            </div>
            <form className="space-y-3">
              <input placeholder="Your Name" className="input-field" />
              <input placeholder="Your Email" type="email" className="input-field" />
              <textarea placeholder="Message" rows={4} className="input-field" />
              <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">Send Message</button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;