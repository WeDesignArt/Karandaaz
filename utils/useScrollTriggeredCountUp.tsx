import { useCallback, useEffect, useRef, useState } from 'react';

// Easing function for animation
const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

// Custom hook for scroll-triggered count up
const useScrollTriggeredCountUp = (
  ref: React.RefObject<HTMLElement>, // Reference to the element being observed
  end: number, // The end value for the count up
  duration: number = 2000 // Duration of the count up animation in milliseconds
): number => {
  const [count, setCount] = useState<number>(0); // State to hold the current count
  const isCounting = useRef<boolean>(false); // Ref to track if counting is in progress
  const frameRate = 1000 / 60; // Frame rate for the animation
  const totalFrames = Math.round(duration / frameRate); // Total number of frames

  // Callback to handle scroll events and trigger count up
  const handleScroll = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting && !isCounting.current) {
        isCounting.current = true;
        let frame = 0;

        const counter = setInterval(() => {
          frame++;
          const progress = easeOutExpo(frame / totalFrames);
          const isLastFrame = frame === totalFrames;
          setCount(isLastFrame ? end : Math.round(end * progress));

          if (isLastFrame) {
            clearInterval(counter);
            isCounting.current = false;
          }
        }, frameRate);
      } else {
        isCounting.current = false;
        setCount(0);
      }
    },
    [end, frameRate, totalFrames] // Dependencies for useCallback
  );

  // Effect to set up and clean up the IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(handleScroll, { threshold: 0.7 });
    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [handleScroll, ref]); // Dependencies for useEffect

  return count;
};

export default useScrollTriggeredCountUp;
