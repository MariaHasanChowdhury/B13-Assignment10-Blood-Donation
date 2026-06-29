import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await api.post('/funding/create-payment-intent', { amount });
    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: { card: elements.getElement(CardElement) }
    });
    if (result.error) { toast.error(result.error.message); return; }
    await api.post('/funding', { userName: user.name, userEmail: user.email, amount });
    toast.success('Thank you for your contribution!');
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-3 border border-gray-300 rounded-lg" />
      <button type="submit" disabled={!stripe} className="w-full bg-red-600 text-white py-2 rounded-lg">Pay ${amount}</button>
    </form>
  );
};

const FundingPage = () => {
  const [fundings, setFundings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(10);

  const fetchFundings = () => api.get('/funding').then(r => setFundings(r.data));
  useEffect(() => { fetchFundings(); }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-red-700">💚 Community Funding</h2>
          <button onClick={() => setShowModal(true)} className="bg-red-600 text-white px-5 py-2 rounded-lg">Give Fund</button>
        </div>
        <div className="overflow-x-auto rounded-xl shadow">
          <table className="w-full text-sm text-left">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="px-4 py-3">Donor</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y">
              {fundings.map(f => (
                <tr key={f._id} className="hover:bg-red-50">
                  <td className="px-4 py-3">{f.userName}</td>
                  <td className="px-4 py-3 font-bold text-green-600">${f.amount}</td>
                  <td className="px-4 py-3 text-gray-500">{new Date(f.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />

      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 shadow-xl w-96">
            <h3 className="text-lg font-bold mb-4">Give a Fund</h3>
            <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} min={1} className="input-field mb-4" />
            <Elements stripe={stripePromise}>
              <CheckoutForm amount={amount} onSuccess={() => { setShowModal(false); fetchFundings(); }} />
            </Elements>
            <button onClick={() => setShowModal(false)} className="mt-3 w-full text-gray-500 hover:text-gray-700">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundingPage;