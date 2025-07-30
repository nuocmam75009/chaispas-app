import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface MyAccountProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MyAccount({ isOpen, onClose }: MyAccountProps) {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'security'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  const handleSave = async () => {
    // TODO: Implement save functionality
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      username: user?.username || '',
      email: user?.email || '',
    });
    setIsEditing(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-purple-900/95 to-blue-900/95 border border-purple-500/50 rounded-3xl p-6 sm:p-8 max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-300 hover:text-purple-100 transition-colors duration-200 z-10"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            👤 My Account
          </h2>
          <p className="text-gray-300">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          {[
            { id: 'profile', label: 'Profile', icon: '👤' },
            { id: 'settings', label: 'Settings', icon: '⚙️' },
            { id: 'security', label: 'Security', icon: '🔒' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'profile' | 'settings' | 'security')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  : 'bg-purple-500/20 text-gray-300 hover:bg-purple-500/30'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[60vh]">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* User Avatar */}
              <div className="text-center">
                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-3xl mb-4">
                  {user?.username?.charAt(0).toUpperCase() || 'U'}
                </div>
                <button className="text-purple-300 hover:text-purple-100 text-sm transition-colors duration-200">
                  Change Avatar
                </button>
              </div>

              {/* Profile Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    disabled={!isEditing}
                    className="w-full bg-black/30 border border-purple-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors duration-200 disabled:opacity-50"
                    placeholder="Enter username"
                  />
                </div>



                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                    className="w-full bg-black/30 border border-purple-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors duration-200 disabled:opacity-50"
                    placeholder="Enter email"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold px-4 py-3 rounded-xl hover:from-purple-400 hover:to-blue-400 transition-all duration-300"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleSave}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold px-4 py-3 rounded-xl hover:from-green-400 hover:to-emerald-400 transition-all duration-300"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold px-4 py-3 rounded-xl hover:from-gray-400 hover:to-gray-500 transition-all duration-300"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Notification Settings */}
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                <h3 className="text-xl font-bold text-white mb-4">🔔 Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">Email Notifications</div>
                      <div className="text-gray-400 text-sm">Receive updates via email</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">Push Notifications</div>
                      <div className="text-gray-400 text-sm">Receive push notifications</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Theme Settings */}
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                <h3 className="text-xl font-bold text-white mb-4">🎨 Appearance</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Theme
                    </label>
                    <select className="w-full bg-black/30 border border-purple-500/30 rounded-xl px-4 py-3 text-white focus:border-purple-400 focus:outline-none transition-colors duration-200">
                      <option value="dark">Dark Theme</option>
                      <option value="light">Light Theme</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              {/* Password Change */}
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                <h3 className="text-xl font-bold text-white mb-4">🔐 Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      className="w-full bg-black/30 border border-purple-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors duration-200"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full bg-black/30 border border-purple-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors duration-200"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="w-full bg-black/30 border border-purple-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors duration-200"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold px-4 py-3 rounded-xl hover:from-green-400 hover:to-emerald-400 transition-all duration-300">
                    Update Password
                  </button>
                </div>
              </div>

              {/* Account Actions */}
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                <h3 className="text-xl font-bold text-white mb-4">⚠️ Account Actions</h3>
                <div className="space-y-3">
                  <button className="w-full text-left bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold px-4 py-3 rounded-xl hover:from-yellow-400 hover:to-orange-400 transition-all duration-300">
                    🗑️ Delete Account
                  </button>
                  <button className="w-full text-left bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold px-4 py-3 rounded-xl hover:from-red-400 hover:to-pink-400 transition-all duration-300" onClick={handleLogout}>
                    🚪 Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}