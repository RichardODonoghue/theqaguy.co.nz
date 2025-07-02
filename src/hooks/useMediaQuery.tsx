'use client';

import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string) => {
  const [matchFound, setMatchFound] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matchFound) {
      setMatchFound(media.matches);
    }
    const listener = () => setMatchFound(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matchFound, query]);

  return matchFound;
};
