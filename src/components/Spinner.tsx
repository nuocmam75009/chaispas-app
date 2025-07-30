import React from 'react';

export default function Spinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Modal Content */}
      <div className="relative bg-gradient-to-br from-purple-900/90 to-blue-900/90 border border-purple-500/50 rounded-3xl p-8 sm:p-12 max-w-md mx-4 transform animate-fade-in">
        {/* Main Spinner */}
        <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8">
          <div className="relative">
            {/* Outer Ring */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-purple-500/30 rounded-full animate-spin">
              <div className="w-full h-full border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
            </div>

            {/* Inner Ring */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-18 h-18 sm:w-24 sm:h-24 border-4 border-blue-500/30 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}>
              <div className="w-full h-full border-4 border-transparent border-t-blue-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>

            {/* Center */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black rounded-full"></div>
            </div>
          </div>

          {/* Animated Text */}
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 animate-pulse">
              DECIDING...
            </h3>
            <p className="text-gray-300 text-base sm:text-lg">
              ^^
            </p>
          </div>

          {/* Glowing Orbs */}
          <div className="flex space-x-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-bounce"
                style={{
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '1.5s'
                }}
              />
            ))}
          </div>
        </div>

        {/* Particle Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-yellow-400 rounded-full animate-ping"
              style={{
                left: `${50 + Math.cos(i * Math.PI / 4) * 100}%`,
                top: `${50 + Math.sin(i * Math.PI / 4) * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
