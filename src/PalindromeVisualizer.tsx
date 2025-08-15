import { useState, useEffect, useCallback, useMemo } from 'react';
import './PalindromeVisualizer.css';

// Curated palindrome examples - moved outside component to prevent re-creation
const PALINDROME_EXAMPLES = [
  "Taco cat",
  "A man a plan a canal Panama",
  "Racecar",
  "Was it a rat I saw?",
  "Madam",
  "Never odd or even",
  "Do geese see God?",
  "A Santa at NASA",
  "Mr. Owl ate my metal worm",
  "Was it a car or a cat I saw?",
  "Step on no pets",
  "Yo, banana boy!",
  "A nut for a jar of tuna",
  "No, Mel Gibson is a casino's big lemon",
  "Borrow or rob?",
  "A Toyota's a Toyota",
  "Red rum, sir, is murder",
  "Live not on evil"
];

const PalindromeVisualizer = () => {
  const [text, setText] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [isPalindrome, setIsPalindrome] = useState<boolean | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [lastExampleIndex, setLastExampleIndex] = useState<number | null>(null);

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

  const getRandomExample = useCallback(() => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * PALINDROME_EXAMPLES.length);
    } while (randomIndex === lastExampleIndex && PALINDROME_EXAMPLES.length > 1);
    
    setLastExampleIndex(randomIndex);
    return PALINDROME_EXAMPLES[randomIndex];
  }, [lastExampleIndex]);

  const handleExampleClick = useCallback(() => {
    const example = getRandomExample();
    setText(example);
  }, [getRandomExample]);

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

      <div className="mb-16 z-10 flex items-center gap-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type anything..."
          className="px-6 py-3 text-2xl text-center border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-400 bg-white/80 backdrop-blur-sm shadow-lg min-w-80"
        />
        <button
          onClick={handleExampleClick}
          title="Try a random palindrome example"
          className="example-button px-4 py-3 text-2xl border-2 border-gray-300 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:border-blue-400 hover:bg-blue-50/80 transition-all duration-200 focus:outline-none focus:border-blue-400"
        >
          💡
        </button>
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
