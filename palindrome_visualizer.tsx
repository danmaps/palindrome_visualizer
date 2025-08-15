import { useState, useEffect } from 'react';

const PalindromeVisualizer = () => {
  const [text, setText] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [isPalindrome, setIsPalindrome] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Clean text for palindrome checking (remove spaces, punctuation, convert to lowercase)
  const cleanText = (str) => {
    return str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  };

  // Check if text is a palindrome
  const checkPalindrome = (str) => {
    const cleaned = cleanText(str);
    if (cleaned.length <= 1) return null; // Don't count single characters or empty strings
    return cleaned === cleaned.split('').reverse().join('');
  };

  useEffect(() => {
    const result = checkPalindrome(text);
    setIsPalindrome(result);
    
    // Remove all non-alphabetic characters and convert to uppercase
    const cleaned = text.replace(/[^a-zA-Z]/g, '').toUpperCase();
    setDisplayText(cleaned);
    
    if (text.trim()) {
      setIsAnimating(true);
      // Restart animation by changing the key
      setAnimationKey(prev => prev + 1);
    } else {
      setIsAnimating(false);
    }
  }, [text]);

  // Create individual letter positions for maintaining orientation
  const createLetterPositions = (str) => {
    const letters = str.split('');
    return letters.map((letter, index) => ({
      letter,
      index
    }));
  };

  const letterPositions = displayText ? createLetterPositions(displayText) : [];

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-all duration-1000 ${
      isPalindrome === true 
        ? 'bg-gradient-to-br from-green-200 via-blue-200 to-purple-200' 
        : isPalindrome === false
        ? 'bg-gradient-to-br from-gray-300 via-gray-200 to-gray-100'
        : 'bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200'
    }`}>
      
      {/* Celebration particles for palindromes */}
      {isPalindrome === true && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-yellow-400 rounded-full animate-bounce"
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

      {/* Input field */}
      <div className="mb-16 z-10">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type anything..."
          className="px-6 py-3 text-2xl text-center border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-400 bg-white/80 backdrop-blur-sm shadow-lg min-w-80"
        />
      </div>

      {/* Rotating text visualization */}
      {displayText && (
        <div className="relative">
          <div 
            key={animationKey}
            className="relative"
            style={{
              animation: isAnimating ? 'spin 4s linear infinite' : 'none',
              transformOrigin: 'center'
            }}
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
                }`}
                style={{
                  animation: isAnimating ? 'counterSpin 4s linear infinite' : 'none',
                  transformOrigin: 'center',
                  display: 'inline-block'
                }}
              >
                {pos.letter}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Status message */}
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

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes counterSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  );
};

export default PalindromeVisualizer;