import { useRef, useEffect } from 'react';

export const useCanvasContext2d = (callback, update) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!(ref || ref.current)) return;

    const width = ref.current.offsetWidth;
    const height = ref.current.offsetHeight;
    const context = ref.current.getContext('2d');
    ref.current.width = width;
    ref.current.height = height;
    const cleanup = callback({ width, height, context, canvas: ref.current });

    return () => {
      cleanup && cleanup();
    };
  }, update);
  return ref;
};
