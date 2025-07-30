import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LoginCredentials } from '../types/auth';

interface LoginProps {
  onSwitchToRegister: () => void;
  onClose: () => void;
}

export default function Login({ onSwitchToRegister, onClose }: LoginProps) {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await login(credentials);

    if (result.success) {
      onClose();
    } else {
      setError(result.error || 'Login failed');
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
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-2xl mb-4">
            🔐
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Welcome back!
          </h2>
          <p className="text-gray-300">
            Sign in to analyze your indecisive ahhhh life
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="Password"
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
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Switch to Register */}
        <div className="text-center mt-6">
          <p className="text-gray-300 text-sm">
            Don&apos;t have an account?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}