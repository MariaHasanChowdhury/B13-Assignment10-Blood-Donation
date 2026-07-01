import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { districts, upazilasByDistrict } from '../utils/locations';

const Register = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_KEY}`,
      formData
    );
    return res.data.data.url;
  };

  const onSubmit = async (data) => {
    try {
      const avatarUrl = await uploadImage(data.avatar[0]);
      const registerData = {
        name: data.name,
        email: data.email,
        avatar: avatarUrl,
        bloodGroup: data.bloodGroup,
        district: data.district,
        upazila: data.upazila,
        password: data.password,
      };
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        registerData
      );
      toast.success('Registration successful!');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleDistrictChange = (e) => {
    const value = e.target.value;
    setSelectedDistrict(value);
    setValue('district', value);
    setValue('upazila', '');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-red-700 text-center mb-6">🩸 Create Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <input
            {...register('name', { required: true })}
            placeholder="Full Name"
            className="input-field"
          />

          <input
            {...register('email', { required: true })}
            type="email"
            placeholder="Email"
            className="input-field"
          />

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Avatar</label>
            <input
              {...register('avatar', { required: true })}
              type="file"
              accept="image/*"
              className="input-field"
            />
          </div>

          <select
            {...register('bloodGroup', { required: true })}
            className="input-field"
          >
            <option value="">Select Blood Group</option>
            {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          {/* District - register থেকে আলাদা করা */}
          <select
            className="input-field"
            onChange={handleDistrictChange}
          >
            <option value="">Select District</option>
            {districts.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          {/* Hidden input for district */}
          <input type="hidden" {...register('district', { required: true })} />

          <select
            {...register('upazila', { required: true })}
            className="input-field"
          >
            <option value="">Select Upazila</option>
            {(upazilasByDistrict[selectedDistrict] || []).map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>

          <input
            {...register('password', { required: true, minLength: 6 })}
            type="password"
            placeholder="Password (min 6 characters)"
            className="input-field"
          />

          <input
            {...register('confirm_password', {
              required: true,
              validate: v => v === watch('password') || 'Passwords do not match'
            })}
            type="password"
            placeholder="Confirm Password"
            className="input-field"
          />
          {errors.confirm_password && (
            <p className="text-red-500 text-sm">{errors.confirm_password.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-red-600 font-medium">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;