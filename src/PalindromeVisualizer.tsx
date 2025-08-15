import { useState, useEffect, useCallback } from 'react';
import './PalindromeVisualizer.css';

const PalindromeVisualizer = () => {
  const [text, setText] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [isPalindrome, setIsPalindrome] = useState<boolean | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const cleanText = useCallback((str: string) => {
    return str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  }, []);

  const checkPalindrome = useCallback((str: string) => {
    const cleaned = cleanText(str);
    if (cleaned.length <= 1) return null;
    return cleaned === cleaned.split('').reverse().join('');
  }, [cleanText]);

  useEffect(() => {
    const result = checkPalindrome(text);
    setIsPalindrome(result);
    
    const cleaned = text.replace(/[^a-zA-Z]/g, '').toUpperCase();
    setDisplayText(cleaned);
    
    if (text.trim()) {
      setIsAnimating(true);
      setAnimationKey(prev => prev + 1);
    } else {
      setIsAnimating(false);
    }
  }, [text, checkPalindrome]);

  const createLetterPositions = useCallback((str: string) => {
    const letters = str.split('');
    return letters.map((letter, index) => ({
      letter,
      index
    }));
  }, []);

  const letterPositions = displayText ? createLetterPositions(displayText) : [];

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-all duration-1000 ${
      isPalindrome === true 
        ? 'bg-gradient-to-br from-green-200 via-blue-200 to-purple-200' 
        : isPalindrome === false
        ? 'bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100'
        : 'bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200'
    }`}>
      
      {isPalindrome === true && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="celebration-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="mb-16 z-10">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type anything..."
          className="px-6 py-3 text-2xl text-center border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-400 bg-white/80 backdrop-blur-sm shadow-lg min-w-80"
        />
      </div>

      {displayText && (
        <div className="relative">
          <div 
            key={animationKey}
            className={`relative ${isAnimating ? 'spin-animation' : ''}`}
          >
            {letterPositions.map((pos, index) => (
              <span
                key={`${animationKey}-${index}`}
                className={`inline-block text-6xl font-mono font-bold transition-all duration-500 ${
                  isPalindrome === true 
                    ? 'text-green-600 drop-shadow-lg' 
                    : isPalindrome === false
                    ? 'text-gray-500'
                    : 'text-indigo-600'
                } ${
                  isPalindrome === false ? 'animate-pulse' : ''
                } ${
                  isAnimating ? 'counter-spin-animation' : ''
                }`}
              >
                {pos.letter}
              </span>
            ))}
          </div>
        </div>
      )}

      {displayText && (
        <div className={`mt-16 text-center transition-all duration-500 ${
          isPalindrome === true ? 'animate-bounce' : isPalindrome === false ? 'animate-pulse' : ''
        }`}>
          <div className={`text-3xl font-bold mb-2 ${
            isPalindrome === true 
              ? 'text-green-600' 
              : isPalindrome === false
              ? 'text-gray-600'
              : 'text-indigo-600'
          }`}>
            {isPalindrome === true ? '🎉' : isPalindrome === false ? '😔' : '🤔'}
          </div>
          <div className={`text-lg ${
            isPalindrome === true 
              ? 'text-green-700 font-semibold' 
              : isPalindrome === false
              ? 'text-gray-600'
              : 'text-indigo-700'
          }`}>
            {isPalindrome === true 
              ? "It's a palindrome! Amazing!" 
              : isPalindrome === false
              ? "Not quite a palindrome..."
              : "Keep typing..."
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default PalindromeVisualizer;
