import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { RegisterCredentials } from '../types/auth';

interface RegisterProps {
  onSwitchToLogin: () => void;
  onClose: () => void;
}

export default function Register({ onSwitchToLogin, onClose }: RegisterProps) {
  const { register } = useAuth();
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate passwords match
    if (credentials.password !== credentials.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Validate password strength
    if (credentials.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    const result = await register(credentials);

    if (result.success) {
      onClose();
    } else {
      setError(result.error || 'Registration failed');
    }

    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-purple-900/95 to-blue-900/95 border border-purple-500/50 rounded-3xl p-6 sm:p-8 max-w-md mx-4 transform animate-fade-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-300 hover:text-purple-100 transition-colors duration-200"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-2xl mb-4">
            🚀
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Join CHAISPAS
          </h2>
          <p className="text-gray-300">
            Tired of being an indecisive idiot? Create an account and start being a man!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="relative">
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="w-full px-4 py-3 bg-gradient-to-r from-purple-600/50 to-blue-600/50 border border-purple-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all duration-300"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Email address"
              required
              className="w-full px-4 py-3 bg-gradient-to-r from-purple-600/50 to-blue-600/50 border border-purple-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all duration-300"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Password (min 6 characters)"
              required
              className="w-full px-4 py-3 bg-gradient-to-r from-purple-600/50 to-blue-600/50 border border-purple-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all duration-300"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type="password"
              name="confirmPassword"
              value={credentials.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              required
              className="w-full px-4 py-3 bg-gradient-to-r from-purple-600/50 to-blue-600/50 border border-purple-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all duration-300"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-black font-bold py-3 rounded-xl hover:from-green-300 hover:to-emerald-400 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Switch to Login */}
        <div className="text-center mt-6">
          <p className="text-gray-300 text-sm">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}