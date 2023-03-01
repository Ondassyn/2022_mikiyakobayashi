import '@/styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  const router = useRouter();

  return getLayout(
    <Component {...pageProps} key={router.pathname} />
  );
}
