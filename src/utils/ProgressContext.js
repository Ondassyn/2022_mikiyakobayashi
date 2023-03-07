import { createContext } from 'react';

const ProgressContext = createContext({
  progress: 0,
  setProgress: () => {},
});

export default ProgressContext;
