import React from "react";

import { useState } from 'react';

const LoginForm = ({ onLogin, switchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);  // To handle loading state
  const [error, setError] = useState(null);  // To handle error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading state
    setError(null);   // Reset any previous error

    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      
      // Save token to localStorage
      localStorage.setItem('token', data.token);
      
      // Call onLogin with user data
      onLogin(data.user);
      
      // Optionally reset form
      setFormData({ email: '', password: '' });
    } catch (err) {
      setError(err.message); // Display error if any
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-red-600">Login</h2>
      
      {/* Error message display */}
      {error && (
        <div className="text-red-600 mb-4 text-center">
          <p>{error}</p>
        </div>
      )}
      
      <div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}  // Disable button while loading
          className={`w-full py-2 px-4 rounded transition duration-200 ${loading ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'} text-white`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
      
      <p className="mt-4 text-center">
        Don't have an account?{' '}
        <button onClick={switchToRegister} className="text-red-600 hover:underline">
          Register
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
