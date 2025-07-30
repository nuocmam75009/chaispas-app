import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onShowDashboard: () => void;
  onShowAuth: () => void;
  onShowMyAccount: () => void;
}

export default function Sidebar({ isOpen, onClose, onShowDashboard, onShowAuth, onShowMyAccount }: SidebarProps) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard Analytics',
      icon: '📊',
      action: () => {
        onShowDashboard();
        onClose();
      },
      color: 'from-purple-500 to-blue-500'
    },
    {
      id: 'account',
      label: 'My Account',
      icon: '👤',
      action: () => {
        onShowMyAccount();
        onClose();
      },
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '⚙️',
      action: () => {
        // TODO: Implement settings
        onClose();
      },
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: '❓',
      action: () => {
        // TODO: Implement help
        onClose();
      },
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="relative w-80 max-w-[85vw] h-full bg-gradient-to-b from-purple-900/95 to-blue-900/95 border-r border-purple-500/30 backdrop-blur-xl">
        {/* Header */}
        <div className="p-6 border-b border-purple-500/30">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Menu</h2>
            <button
              onClick={onClose}
              className="text-purple-300 hover:text-purple-100 transition-colors duration-200"
            >
              ✕
            </button>
          </div>

          {/* User Profile */}
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 border border-purple-500/30">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-bold truncate">
                  {user?.username || 'Guest User'}
                </div>
                <div className="text-gray-300 text-sm">
                  {user ? 'Signed In' : 'Not signed in'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={item.action}
              className="w-full flex items-center space-x-4 p-4 rounded-2xl bg-black/20 hover:bg-black/40 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 transform hover:scale-105 group"
            >
              <div className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center text-white text-lg group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>
              <span className="text-white font-medium text-left flex-1">
                {item.label}
              </span>
              <div className="text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                →
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-purple-500/30">
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-white font-medium transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white text-lg">
                🚪
              </div>
              <span>Sign Out</span>
            </button>
          ) : (
            <button
              onClick={() => {
                onShowAuth();
                onClose();
              }}
              className="w-full flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white font-medium transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white text-lg">
                🔐
              </div>
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
