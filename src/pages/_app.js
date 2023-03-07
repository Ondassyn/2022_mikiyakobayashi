import '@/styles/globals.css';
import ProgressContext from '@/utils/ProgressContext';
import { useMemo, useState } from 'react';

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  const [progress, setProgress] = useState(0);
  const contextValue = useMemo(
    () => ({ progress, setProgress }),
    [progress]
  );

  return getLayout(
    <ProgressContext.Provider value={contextValue}>
      {useMemo(
        () => (
          <Component {...pageProps} />
        ),
        [pageProps]
      )}
    </ProgressContext.Provider>
  );
}
