import React, { useState } from 'react';

interface ChoiceInputProps {
  onAddChoice: (text: string) => void;
}

export default function ChoiceInput({ onAddChoice }: ChoiceInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddChoice(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-purple-500/30">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">
        Add Your Choices
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter choice"
            className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-600/50 to-blue-600/50 border border-purple-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all duration-300 text-base sm:text-lg"
            style={{
              boxShadow: '0 0 20px rgba(147, 51, 234, 0.3)'
            }}
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 pointer-events-none animate-pulse"></div>
        </div>

        <button
          type="submit"
          disabled={!inputValue.trim()}
          className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-black font-bold text-base sm:text-lg py-3 sm:py-4 rounded-xl hover:from-green-300 hover:to-emerald-400 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
        >
          ADD CHOICE
        </button>
      </form>
    </div>
  );
}
