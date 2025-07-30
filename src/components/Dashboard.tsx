import React, { useState, useEffect } from 'react';
import { AnalyticsData } from '../types/analytics';
import { calculateAnalytics, clearAnalytics, exportAnalytics } from '../utils/analytics';

interface DashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Dashboard({ isOpen, onClose }: DashboardProps) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'stats'>('overview');

  useEffect(() => {
    if (isOpen) {
      setAnalytics(calculateAnalytics());
    }
  }, [isOpen]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatTime = (ms: number) => {
    return `${(ms / 1000).toFixed(1)}s`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-purple-900/95 to-blue-900/95 border border-purple-500/50 rounded-3xl p-6 sm:p-8 max-w-6xl mx-4 max-h-[90vh] overflow-hidden">
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
            📊 Decision Analytics
          </h2>
          <p className="text-gray-300">
            Track your decision-making journey
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          {[
            { id: 'overview', label: 'Overview', icon: '📈' },
            { id: 'history', label: 'History', icon: '📋' },
            { id: 'stats', label: 'Stats', icon: '📊' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'overview' | 'history' | 'stats')}
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
          {activeTab === 'overview' && analytics && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-purple-600/50 to-blue-600/50 p-4 rounded-xl border border-purple-400/30">
                  <div className="text-2xl font-bold text-white">{analytics.totalDecisions}</div>
                  <div className="text-gray-300 text-sm">Total Decisions</div>
                </div>
                <div className="bg-gradient-to-br from-green-600/50 to-emerald-600/50 p-4 rounded-xl border border-green-400/30">
                  <div className="text-2xl font-bold text-white">{analytics.totalChoices}</div>
                  <div className="text-gray-300 text-sm">Total Choices</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-600/50 to-orange-600/50 p-4 rounded-xl border border-yellow-400/30">
                  <div className="text-2xl font-bold text-white">{analytics.averageChoicesPerDecision}</div>
                  <div className="text-gray-300 text-sm">Avg Choices</div>
                </div>
                <div className="bg-gradient-to-br from-red-600/50 to-pink-600/50 p-4 rounded-xl border border-red-400/30">
                  <div className="text-2xl font-bold text-white">{formatTime(analytics.averageDecisionTime)}</div>
                  <div className="text-gray-300 text-sm">Avg Time</div>
                </div>
              </div>

              {/* Most Common Choices */}
              {analytics.mostCommonChoices.length > 0 && (
                <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                  <h3 className="text-xl font-bold text-white mb-4">🔥 Most Common Choices</h3>
                  <div className="space-y-3">
                    {analytics.mostCommonChoices.slice(0, 5).map((choice, index) => (
                      <div key={choice.text} className="flex items-center justify-between bg-gradient-to-r from-purple-600/30 to-blue-600/30 p-3 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-xs">
                            {index + 1}
                          </div>
                          <span className="text-white font-medium">{choice.text}</span>
                        </div>
                        <span className="text-yellow-400 font-bold">{choice.count}x</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && analytics && (
            <div className="space-y-4">
              {analytics.recentDecisions.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🤔</div>
                  <p className="text-gray-300 text-lg">No decisions made yet!</p>
                  <p className="text-gray-400 text-sm">Make your first decision to see history here.</p>
                </div>
              ) : (
                analytics.recentDecisions.map((decision) => (
                  <div key={decision.id} className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 border border-purple-500/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-gray-300 text-sm">{formatDate(decision.timestamp)}</div>
                      <div className="text-yellow-400 text-sm font-bold">
                        {decision.choices.length} choices • {formatTime(decision.decisionTime)}
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="text-gray-400 text-sm mb-1">Choices:</div>
                      <div className="flex flex-wrap gap-2">
                        {decision.choices.map((choice) => (
                          <span
                            key={choice.id}
                            className={`px-2 py-1 rounded-lg text-xs font-medium ${
                              choice.id === decision.selectedChoice.id
                                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                                : 'bg-purple-600/30 text-gray-300'
                            }`}
                          >
                            {choice.text}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-600/30 to-emerald-600/30 p-3 rounded-xl">
                      <div className="text-green-400 text-sm font-bold mb-1">🎯 Selected:</div>
                      <div className="text-white font-bold">{decision.selectedChoice.text}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'stats' && analytics && (
            <div className="space-y-6">
              {/* Decision Timeline */}
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                <h3 className="text-xl font-bold text-white mb-4">📅 Decision Timeline</h3>
                <div className="space-y-3">
                  {analytics.decisionHistory.slice(-7).reverse().map((decision, index) => (
                    <div key={decision.id} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {analytics.decisionHistory.length - index}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">{decision.selectedChoice.text}</div>
                        <div className="text-gray-400 text-sm">{formatDate(decision.timestamp)}</div>
                      </div>
                      <div className="text-yellow-400 text-sm font-bold">
                        {decision.choices.length} choices
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    const data = exportAnalytics();
                    const blob = new Blob([data], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'chaispas-analytics.json';
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold px-4 py-2 rounded-xl hover:from-green-400 hover:to-emerald-400 transition-all duration-300"
                >
                  📥 Export Data
                </button>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to clear all analytics data? This cannot be undone.')) {
                      clearAnalytics();
                      setAnalytics(calculateAnalytics());
                    }
                  }}
                  className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold px-4 py-2 rounded-xl hover:from-red-400 hover:to-pink-400 transition-all duration-300"
                >
                  🗑️ Clear Data
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}