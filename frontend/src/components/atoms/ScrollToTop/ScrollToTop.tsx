'use client';

import { useEffect, type ReactNode } from 'react';

interface ScrollToTopProps {
  children: ReactNode;
}

export const ScrollToTop = ({ children }: ScrollToTopProps) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return <>{children}</>;
};
