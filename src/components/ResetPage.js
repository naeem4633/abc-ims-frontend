import { useEffect } from 'react';

export const ResetPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};