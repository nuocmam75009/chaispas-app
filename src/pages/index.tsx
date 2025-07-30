import React, { useState } from 'react';
import Head from 'next/head';
import ChoiceInput from '../components/ChoiceInput';
import Spinner from '../components/Spinner';
import ResultDisplay from '../components/ResultDisplay';

interface Choice {
  id: string;
  text: string;
  number: number;
}

export default function Home() {
  const [choices, setChoices] = useState<Choice[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<Choice | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showError, setShowError] = useState(false);

  const addChoice = (text: string) => {
    if (text.trim()) {
      const newChoice: Choice = {
        id: Date.now().toString(),
        text: text.trim(),
        number: Math.floor(Math.random() * 1000) + 1,
      };
      setChoices([...choices, newChoice]);
    }
  };

  const removeChoice = (id: string) => {
    setChoices(choices.filter(choice => choice.id !== id));
  };

    const startDecision = () => {
    if (choices.length < 2) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    setIsSpinning(true);
    setShowResult(false);
    setShowError(false);

    // Simulate spinning animation
    setTimeout(() => {
      const randomChoice = choices[Math.floor(Math.random() * choices.length)];
      setResult(randomChoice);
      setIsSpinning(false);
      setShowResult(true);
    }, 3000);
  };

  const resetGame = () => {
    setChoices([]);
    setResult(null);
    setShowResult(false);
  };

  return (
    <>
      <Head>
        <title>CHAIS PAS</title>
        <meta name="description" content="Let fate decide for you!" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#1e1b4b" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
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

        <div className="relative z-10 container mx-auto px-4 py-4 sm:py-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-4 animate-pulse">
              IDK BRO
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 px-4">
              Can&apos;t make a decision? Let a random dumbass program do the work for you!
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            {!showResult ? (
              <div className="space-y-6 sm:space-y-8">
                {/* Choice Input */}
                <ChoiceInput onAddChoice={addChoice} />

                {/* Choices List */}
                {choices.length > 0 && (
                  <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-purple-500/30">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 text-center">
                      Your Choices ({choices.length})
                    </h2>
                    <div className="grid gap-3 sm:gap-4">
                      {choices.map((choice, index) => (
                        <div
                          key={choice.id}
                          className="flex items-center justify-between bg-gradient-to-r from-purple-600/50 to-blue-600/50 p-3 sm:p-4 rounded-xl border border-purple-400/30 hover:border-purple-400/60 transition-all duration-300 transform hover:scale-105"
                        >
                          <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black font-bold text-xs sm:text-sm flex-shrink-0">
                              {index + 1}
                            </div>
                            <span className="text-white text-base sm:text-lg font-medium truncate">
                              {choice.text}
                            </span>
                          </div>
                          <button
                            onClick={() => removeChoice(choice.id)}
                            className="text-red-400 hover:text-red-300 transition-colors duration-200 ml-2 flex-shrink-0"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Decision Button */}
                <div className="text-center">
                  <button
                    onClick={startDecision}
                    disabled={isSpinning}
                    className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black font-bold text-lg sm:text-xl px-8 sm:px-12 py-3 sm:py-4 rounded-2xl hover:from-yellow-300 hover:via-orange-400 hover:to-red-400 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl w-full sm:w-auto"
                  >
                    {isSpinning ? 'DECIDING...' : 'MAKE DECISION!'}
                  </button>

                  {/* Error Modal */}
                  {showError && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                      {/* Backdrop */}
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"></div>

                      {/* Modal */}
                      <div className="relative bg-gradient-to-br from-red-900/90 to-red-800/90 border border-red-500/50 rounded-2xl p-6 sm:p-8 max-w-md mx-4 transform animate-fade-in">
                        {/* Close button */}
                        <button
                          onClick={() => setShowError(false)}
                          className="absolute top-4 right-4 text-red-300 hover:text-red-100 transition-colors duration-200"
                        >
                          ✕
                        </button>

                        {/* Error Icon */}
                        <div className="text-center mb-6">
                          <div className="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center text-3xl animate-pulse">
                            🤦‍♂️
                          </div>
                        </div>

                        {/* Error Message */}
                        <div className="text-center">
                          <h3 className="text-2xl font-bold text-red-300 mb-4">
                            OOPS!
                          </h3>
                          <p className="text-red-200 text-lg font-medium">
                            You need to enter at least two, dumbass
                          </p>
                        </div>

                        {/* Action Button */}
                        <div className="mt-6 text-center">
                          <button
                            onClick={() => setShowError(false)}
                            className="bg-gradient-to-r from-red-500 to-red-600 text-white font-bold px-6 py-3 rounded-xl hover:from-red-400 hover:to-red-500 transform hover:scale-105 transition-all duration-300"
                          >
                            GOT IT
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <ResultDisplay result={result!} onReset={resetGame} />
            )}

            {/* Spinner Modal */}
            {isSpinning && <Spinner />}
          </div>
        </div>
      </div>
    </>
  );
}