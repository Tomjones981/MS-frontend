import React, { useState } from 'react';
import { useStateContext } from '../../../context/ContextProvider';
import SpinnerButton from '../../components/SpinnerButton';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useStateContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;  

    setLoading(true);
    try { 
      const result = login({ email, password });
      if (result && typeof result.then === 'function') {
        await result;  
      }
 
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Login</h1>

      {/* Email */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">
          Username
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
            dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">
          Password
        </label>
        <div className="relative">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={passwordVisible ? 'text' : 'password'}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white pr-10"
          />
          <button
            type="button"
            onClick={() => setPasswordVisible((v) => !v)}
            aria-label={passwordVisible ? 'Hide password' : 'Show password'}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-300"
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full h-10 p-3 text-gray-200 bg-gray-900 rounded-md 
          hover:bg-gray-800 flex justify-center items-center mt-5 disabled:opacity-60"
      >
        {loading ? <SpinnerButton /> : 'Login'}
      </button>

      
      <div className="text-center mt-4">
        <a href="/" className="text-gray-200 hover:underline">
          Forgot Password?
        </a>
      </div>
    </form>
  );
};

export default Login;
