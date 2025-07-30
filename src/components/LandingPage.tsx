import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

interface LandingPageProps {
  onContinueWithoutAccount: () => void;
}

export default function LandingPage({ onContinueWithoutAccount }: LandingPageProps) {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-md w-full">
          {/* Logo and Title */}
          <div className="text-center mb-12">
            <div className="text-6xl sm:text-8xl mb-6 animate-pulse">
              🎲
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-4">
              IDK BRO
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8">
              Can&apos;t make a decision? Let a random dumbass program do the work for you!
            </p>
          </div>

          {/* Action Cards */}
          <div className="space-y-4">
            {/* Sign In Card */}
            <button
              onClick={() => {
                setAuthMode('login');
                setShowAuth(true);
              }}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white font-bold py-4 px-6 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-2xl border border-purple-400/30"
            >
              <div className="flex items-center justify-center space-x-3">
                <span className="text-2xl">🔐</span>
                <span className="text-lg">Sign In</span>
              </div>
            </button>

            {/* Register Card */}
            <button
              onClick={() => {
                setAuthMode('register');
                setShowAuth(true);
              }}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold py-4 px-6 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-2xl border border-green-400/30"
            >
              <div className="flex items-center justify-center space-x-3">
                <span className="text-2xl">📝</span>
                <span className="text-lg">Create Account</span>
              </div>
            </button>

            {/* Continue Without Account Card */}
            <button
              onClick={onContinueWithoutAccount}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-bold py-4 px-6 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-2xl border border-gray-500/30"
            >
              <div className="flex items-center justify-center space-x-3">
                <span className="text-2xl">🚀</span>
                <span className="text-lg">Continue Without Account</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Auth Modals */}
      {showAuth && authMode === 'login' && (
        <Login
          onSwitchToRegister={() => setAuthMode('register')}
          onClose={() => setShowAuth(false)}
        />
      )}
      {showAuth && authMode === 'register' && (
        <Register
          onSwitchToLogin={() => setAuthMode('login')}
          onClose={() => setShowAuth(false)}
        />
      )}
    </div>
  );
}