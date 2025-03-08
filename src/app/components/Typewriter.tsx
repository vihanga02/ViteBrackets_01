import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  pause?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 100, pause = 2000 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && index < text.length) {
      // Typing: add the next character
      timeout = setTimeout(() => {
        setDisplayedText(text.substring(0, index + 1));
        setIndex(index + 1);
      }, speed);
    } else if (!isDeleting && index === text.length) {
      // When finished typing, wait before starting deletion
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pause);
    } else if (isDeleting && index > 0) {
      // Deleting: remove one character at a time (delete faster than typing)
      timeout = setTimeout(() => {
        setDisplayedText(text.substring(0, index - 1));
        setIndex(index - 1);
      }, speed / 2);
    } else if (isDeleting && index === 0) {
      // When deletion is complete, wait before starting to type again
      timeout = setTimeout(() => {
        setIsDeleting(false);
      }, pause);
    }

    return () => clearTimeout(timeout);
  }, [index, isDeleting, text, speed, pause]);

  return (
    <div className="font-mono text-xl sm:text-4xl text-white/70">
      {displayedText}
      <span
        className="border-r-2 border-white"
        style={{ animation: 'pulse 0.5s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}
      >
        &nbsp;
      </span>
    </div>
  );
};

export default Typewriter;
