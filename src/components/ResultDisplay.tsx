import React, { useEffect, useState } from 'react';

interface Choice {
  id: string;
  text: string;
  number: number;
}

interface ResultDisplayProps {
  result: Choice;
  onReset: () => void;
}

export default function ResultDisplay({ result, onReset }: ResultDisplayProps) {
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Trigger animations with delays
    const timer1 = setTimeout(() => setShowResult(true), 500);
    const timer2 = setTimeout(() => setShowConfetti(true), 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="text-center space-y-8">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Result Card */}
      <div className={`transform transition-all duration-1000 ${
        showResult ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
      }`}>
        <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-1 rounded-3xl shadow-2xl">
          <div className="bg-black/90 backdrop-blur-sm rounded-3xl p-4 sm:p-8 border border-yellow-400/30">
            {/* Trophy Icon */}
            <div className="mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl sm:text-4xl animate-pulse">
                🏆
              </div>
            </div>

            {/* Result Text */}
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 animate-pulse px-2">
              The dumbass program has decided
            </h2>

            <div className="mb-6 sm:mb-8">
              <p className="text-gray-300 text-base sm:text-lg mb-4">
                The chosen one is:
              </p>
              <div className="bg-gradient-to-r from-purple-600/50 to-blue-600/50 p-4 sm:p-6 rounded-2xl border border-purple-400/30">
                <h3 className="text-xl sm:text-3xl font-bold text-white mb-2 break-words">
                  {result.text}
                </h3>
{/*                 <p className="text-yellow-400 text-lg">
                   Number: {result.number}
                </p> */}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={onReset}
                className="bg-gradient-to-r from-green-400 to-emerald-500 text-black font-bold px-6 sm:px-8 py-3 rounded-xl hover:from-green-300 hover:to-emerald-400 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                START OVER
              </button>

              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-blue-400 to-cyan-500 text-black font-bold px-6 sm:px-8 py-3 rounded-xl hover:from-blue-300 hover:to-cyan-400 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                NEW DECISION
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
