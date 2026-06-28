import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DonationRequests from './pages/DonationRequests';
import DonationDetails from './pages/DonationDetails';
import SearchPage from './pages/SearchPage';
import FundingPage from './pages/FundingPage';
import DashboardLayout from './layouts/DashboardLayout';
import PrivateRoute from './routes/PrivateRoute';
import RoleRoute from './routes/RoleRoute';

// Dashboard pages
import Profile from './pages/dashboard/Profile';
import DonorHome from './pages/dashboard/DonorHome';
import MyDonationRequests from './pages/dashboard/MyDonationRequests';
import CreateDonation from './pages/dashboard/CreateDonation';
import EditDonation from './pages/dashboard/EditDonation';
import AdminHome from './pages/dashboard/AdminHome';
import AllUsers from './pages/dashboard/AllUsers';
import AllDonations from './pages/dashboard/AllDonations';

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/donation-requests" element={<DonationRequests />} />
      <Route path="/search" element={<SearchPage />} />

      {/* Private */}
      <Route path="/donation-requests/:id" element={<PrivateRoute><DonationDetails /></PrivateRoute>} />
      <Route path="/funding" element={<PrivateRoute><FundingPage /></PrivateRoute>} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
        <Route index element={<DonorHome />} />
        <Route path="profile" element={<Profile />} />
        <Route path="my-donation-requests" element={<MyDonationRequests />} />
        <Route path="create-donation-request" element={<CreateDonation />} />
        <Route path="edit-donation/:id" element={<EditDonation />} />
        {/* Admin & Volunteer */}
        <Route path="all-users" element={<RoleRoute roles={['admin']}><AllUsers /></RoleRoute>} />
        <Route path="all-blood-donation-request" element={<RoleRoute roles={['admin','volunteer']}><AllDonations /></RoleRoute>} />
      </Route>
    </Routes>
  );
}

export default App;